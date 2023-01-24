const DEFAULT_TIME_IN_MINUTES = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15
}

let intervalId = null;
let totalSeconds = 0;

// Select elements from the DOM
const minutesElement = document.querySelector("span.minutes");
const secondsElement = document.querySelector("span.seconds");
const startButton = document.querySelector("button#start-button");
const pauseButton = document.querySelector("button#pause-button");
const continueButton = document.querySelector("button#continue-button");
const actionButton = document.querySelector("button#action-button");

const minutesToSeconds = function (minutes) {
  return minutes * 60;
}

const addLeadingZero = function (number) {
  return number < 10 ? `0${number}` : number;
}

const updateTimerComponent = function (minutes, seconds) {
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

const tick = function () {

  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(function () {

    totalSeconds--;

    // Calculate minutes & seconds
    const remainingMinutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    // Update the DOM
    updateTimerComponent(
      remainingMinutes,
      remainingSeconds
    );

    if (totalSeconds === 0) {
      clearInterval(intervalId);
    }
  }, 1000)
}

const initCountdown = function (minutes) {
  updateTimerComponent(minutes, 0);
  totalSeconds = minutesToSeconds(minutes);
  tick();
}

actionButton.addEventListener("click", function () {
  
  const action = this.dataset.action;
  // start the countdown
  if (action === "start") {
    initCountdown(DEFAULT_TIME_IN_MINUTES.focus);
    this.dataset.action = "pause";
    this.textContent = "Pause";
    return;
  }
  // if is runnig, make a pause
  else if (action === "pause") {
    clearInterval(intervalId);
    this.dataset.action = "continue";
    this.textContent = "Continue";
  }
  // If is paused, continue
  else if (action === "continue") {
    if (totalSeconds > 0) {
      this.dataset.action = "pause";
      this.textContent = "Pause";
      tick();
    }
  }
});

window.onload = function () {
  // minutesElement.textContent = DEFAULTS.pomodoroTime;
}
