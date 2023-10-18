const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdown-form");
const dateEl = document.getElementById("date-picker");
let countdownTitle = "";
let countdownDate = "";

// Set date input don´t allow dates before today
const todayLongFormat = new Date().toISOString();
const today = todayLongFormat.split("T")[0];
dateEl.setAttribute("min", today);

// take values form the form
function updateCountdown(event) {
  event.preventDefault();
  countdownTitle = event.target[0].value;
  countdownDate = event.target[1].value;
}

// Event listeners
countdownForm.addEventListener("submit", updateCountdown);
