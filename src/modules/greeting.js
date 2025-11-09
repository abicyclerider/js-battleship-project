export function getGreeting() {
  return "Hello from The Odin Project!";
}

export function createWelcomeMessage() {
  const message = document.createElement("p");
  message.textContent = getGreeting();
  message.style.fontSize = "1.5rem";
  message.style.marginTop = "2rem";
  return message;
}
