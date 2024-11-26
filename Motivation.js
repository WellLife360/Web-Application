// Array of motivational quotes
const quotes = [
    "The only way to achieve the impossible is to believe it is possible. - Charles Kingsleigh",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Don’t watch the clock; do what it does. Keep going.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "What lies behind us and what lies before us are tiny matters compared to what lies within us. - Ralph Waldo",
    "You don’t have to be great to start, but you have to start to be great. - Zig Ziglar",
    "In the middle of difficulty lies opportunity. - Albert Einstein"



];

// Function to generate a random quote from the array
function generateQuote() {
    const quoteText = document.createElement('span'); // Create a span element for the quote
    const randomIndex = Math.floor(Math.random() * quotes.length); // Select a random quote
    quoteText.textContent = quotes[randomIndex]; // Set the quote text

    // Find the quote container and add the quote element
    const quoteContainer = document.getElementById("quoteContainer");
    quoteContainer.innerHTML = ''; // Clear any existing quote
    quoteContainer.appendChild(quoteText);

    // Trigger animation to bring the quote into view
    quoteContainer.style.left = '20px'; // Move it into the screen
}

// Add an event listener to the title to trigger the quote animation when clicked
document.getElementById("heroTitle").addEventListener("click", function() {
    generateQuote();
});
