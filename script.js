const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdown-form");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownButton = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;

let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set date input don´t allow dates before today
const todayLongFormat = new Date().toISOString();
const today = todayLongFormat.split("T")[0];
dateEl.setAttribute("min", today);

// update DOM with date values
function updateDom() {
  countdownActive = setInterval(() => {
    //const now = new Date().getTime();
    const tzOffset = -300;
    const now = new Date();
    const colombiaTime = new Date(now.getTime() + tzOffset * 60 * 1000);

    // difference between today and the date selected
    // const distance = countdownValue - now;
    const distance = countdownValue - colombiaTime;
    const daysRemaining = Math.floor(distance / day);
    const hoursRemaining = Math.floor((distance % day) / hour);
    const minutesRemaining = Math.floor((distance % hour) / minute);
    const secondsRemaining = Math.floor((distance % minute) / second);
    console.log({
      daysRemaining,
      hoursRemaining,
      minutesRemaining,
      secondsRemaining,
    });
    // Populating UI
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${daysRemaining}`;
    timeElements[1].textContent = `${hoursRemaining}`;
    timeElements[2].textContent = `${minutesRemaining}`;
    timeElements[3].textContent = `${secondsRemaining}`;

    // Hide input form
    inputContainer.hidden = true;
    // show countdown
    countdownEl.hidden = false;
  }, 1000);
}

// take values form the form
function updateCountdown(event) {
  event.preventDefault();
  countdownTitle = event.srcElement[0].value;
  countdownDate = event.srcElement[1].value;
  // checking there is a valid date
  if (countdownDate === "") {
    alert("Please, select the date for the countdown");
  } else {
    // get number version of current date, update DOM
    countdownValue = new Date(countdownDate).getTime();
    console.log(countdownValue);
    updateDom();
  }
}

// Reset app functionality
function resetApp() {
  // hide countdown and show inputs
  inputContainer.hidden = false;
  countdownEl.hidden = true;
  // Stop interval
  clearInterval(countdownActive);
  // reset values
  let countdownTitle = "";
  let countdownDate = "";
}

// Event listeners
countdownForm.addEventListener("submit", updateCountdown);
countdownButton.addEventListener("click", resetApp);
