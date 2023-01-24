const FOCUS = { name: 'Focus time', time: 25 };
const SHORT_BREAK = { name: 'Short break', time: 5 }
const LONG_BREAK = { name: 'Long break', time: 15 }

let intervalId = null;
let totalSeconds = 0;
let nextTimer = FOCUS;

// Select elements from the DOM
const minutesElement = document.querySelector("span.minutes");
const secondsElement = document.querySelector("span.seconds");
const actionButton = document.querySelector("button#action-button");
const title = document.getElementById("pomodoro-title");

const minutesToSeconds = function (minutes) {
  return minutes * 60;
}

const addLeadingZero = function (number) {
  return number < 10 ? `0${number}` : number;
}

const playBell = function () {
  const audio = new Audio("./media/bell.wav");
  audio.play();
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
      playBell();
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
    initCountdown(nextTimer.time);
    this.dataset.action = "pause";
    this.textContent = "Pause";
    return;
  }
  else if (action === "pause") {
    clearInterval(intervalId);
    this.dataset.action = "continue";
    this.textContent = "Continue";
  }
  else if (action === "continue") {
    if (totalSeconds > 0) {
      this.dataset.action = "pause";
      this.textContent = "Pause";
      tick();
    }
  }
});

window.onload = function () {
  updateTimerComponent(FOCUS.time, 0);
  title.textContent = FOCUS.name;
}
