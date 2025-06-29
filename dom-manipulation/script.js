let quotes = [
    {text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    {text: "Life is what happens what happens when you're busy making other plans.", category: "Life" },
];


function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  const displayDiv = document.getElementById("quoteDisplay");
  displayDiv.innerHTML = `<p>"${quote.text}"<br><em>- ${quote.category}</em></p>`;
}


document.getElementById("newQuote").addEventListener("click", showRandomQuote);

function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    alert("Quote added!");
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please enter both a quote and a category.");
  }
}

