let quotes = [];

function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  if (stored) {
    quotes = JSON.parse(stored);
  } else {
    quotes = [
      {
        text: "The best way to get started is to quit talking and begin doing.",
        category: "Motivation",
      },
      {
        text: "Life is what happens when you're busy making other plans.",
        category: "Life",
      }
    ];
  }
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function showRandomQuote(filtered = false) {
  let displayList = quotes;
  const selected = localStorage.getItem("selectedCategory");
  if (filtered && selected && selected !== "all") {
    displayList = quotes.filter(q => q.category === selected);
  }

  if (displayList.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "<p>No quotes found.</p>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * displayList.length);
  const quote = displayList[randomIndex];
  document.getElementById("quoteDisplay").innerHTML = 
    `<p>"${quote.text}"<br><em>- ${quote.category}</em></p>`;

  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();
    populateCategories();
    showRandomQuote(true);
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please enter both a quote and a category.");
  }
}

function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);
}

function exportToJson() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    alert("Quotes imported successfully!");
    showRandomQuote(true);
  };
  fileReader.readAsText(event.target.files[0]);
}

function showLastViewedQuote() {
  const last = sessionStorage.getItem("lastQuote");
  if (last) {
    const quote = JSON.parse(last);
    document.getElementById("quoteDisplay").innerHTML =
      `<p>"${quote.text}"<br><em>- ${quote.category}</em></p>`;
  }
}

function populateCategories() {
  const dropdown = document.getElementById("categoryFilter");
  const current = dropdown.value;

  dropdown.innerHTML = `<option value="all">All Categories</option>`;

  const uniqueCategories = [...new Set(quotes.map(q => q.category))];
  uniqueCategories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    dropdown.appendChild(option);
  });

  const saved = localStorage.getItem("selectedCategory");
  if (saved) {
    dropdown.value = saved;
  } else {
    dropdown.value = current || "all";
  }
}

function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selected);
  showRandomQuote(true);
}

// Initialize
loadQuotes();
populateCategories();
createAddQuoteForm();
document.getElementById("newQuote").addEventListener("click", () => showRandomQuote(true));
showLastViewedQuote();
