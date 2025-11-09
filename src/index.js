import "./style.css";
import { createWelcomeMessage } from "./modules/greeting.js";

console.log("Webpack is working!");

// Get the content div
const content = document.getElementById("content");

// Add welcome message
content.appendChild(createWelcomeMessage());

// Add event listeners to navigation buttons
document.getElementById("home").addEventListener("click", () => {
  content.innerHTML = "";
  content.appendChild(createWelcomeMessage());
});

document.getElementById("menu").addEventListener("click", () => {
  content.innerHTML = "<h2>Menu Page</h2><p>Add your menu content here.</p>";
});

document.getElementById("about").addEventListener("click", () => {
  content.innerHTML = "<h2>About Page</h2><p>Add your about content here.</p>";
});
