const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdown-form");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownButton = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let dataToLocalStorage;

let countdownTitle = "";
let countdownDate = "";
let countdownValue = new Date();

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
    const distance = countdownValue - colombiaTime;
    const daysRemaining = Math.floor(distance / day);
    const hoursRemaining = Math.floor((distance % day) / hour);
    const minutesRemaining = Math.floor((distance % hour) / minute);
    const secondsRemaining = Math.floor((distance % minute) / second);

    // Hide input form
    inputContainer.hidden = true;

    // if countdown ended show complete
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      // Populating UI
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${daysRemaining}`;
      timeElements[1].textContent = `${hoursRemaining}`;
      timeElements[2].textContent = `${minutesRemaining}`;
      timeElements[3].textContent = `${secondsRemaining}`;

      // show countdown
      countdownEl.hidden = false;
    }
  }, 1000);
}

// take values form the form
function updateCountdown(event) {
  event.preventDefault();
  countdownTitle = event.srcElement[0].value;
  countdownDate = event.srcElement[1].value;
  // Save data in LOCALSTORAGE
  dataToLocalStorage = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem("countdown", JSON.stringify(dataToLocalStorage));
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
  // hide complete block
  completeEl.hidden = true;
  // Stop interval
  clearInterval(countdownActive);
  // reset values
  let countdownTitle = "";
  let countdownDate = "";
  // reset form values
  countdownForm.reset();
  // reset localStorage
  localStorage.removeItem("countdown");
}

function restorePreviousCountdown() {
  if (localStorage.getItem("countdown")) {
    // if a previous countdown exist, we should hide input elements
    inputContainer.hidden = true;
    // we need populated our data
    dataToLocalStorage = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = dataToLocalStorage.title;
    countdownDate = dataToLocalStorage.date;
    // to work we need the countdownValue
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
  }
}

// Event listeners
countdownForm.addEventListener("submit", updateCountdown);
countdownButton.addEventListener("click", resetApp);
completeBtn.addEventListener("click", resetApp);

// check if there are data in localStorage
restorePreviousCountdown();
