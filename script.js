const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdown-form");
const dateEl = document.getElementById("date-picker");

// Set date input don´t allow dates before today
const todayLongFormat = new Date().toISOString();
const today = todayLongFormat.split("T")[0];
dateEl.setAttribute("min", today);
