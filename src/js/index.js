const FOCUS = { id: 'focus', name: 'Focus time', time: 25 };
const SHORT_BREAK = { id: 'short', name: 'Short break', time: 5 }
const LONG_BREAK = { id: 'long', name: 'Long break', time: 15 }

const LONG_BREAK_INTERVALS = 4;

let intervalId = null;
let totalSeconds = 0;
let currentTimer = FOCUS;
let totalPodomoros = 0;

// Select elements from the DOM
const minutesElement = document.querySelector("span.minutes");
const secondsElement = document.querySelector("span.seconds");
const actionButton = document.querySelector("button#action-button");
const stopButton = document.querySelector("button#stop-button");
const title = document.getElementById("pomodoro-title");
const totalPomodorosElement = document.getElementById("total-pomodoro");

// Helper functions
const beforeUnload = function () {
  return true;
}

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

const playClick = function () {
  const audio = new Audio("./media/click.wav");
  audio.play();
}

// Update DOM functions

const updateTimerComponent = function (minutes, seconds) {

  minutes = addLeadingZero(minutes);
  seconds = addLeadingZero(seconds);

  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;

  const tabTitle = `${minutes}:${seconds} ${currentTimer.name} | Pomodoro App`;

  document.title = tabTitle;
}

const updateActionButton = function (action) {
  actionButton.dataset.action = action.toLowerCase();
  actionButton.textContent = action;
}

const stopTimer = function () {
  playBell();
  window.onbeforeunload = null;
  clearInterval(intervalId);
  stopButton.style.display = "none";
  updateActionButton("Start");

  // If current was a kind of break, then activate a focus timer
  if (currentTimer.id === "short" || currentTimer.id === "long") {
    currentTimer = FOCUS;
  }
  // If current was a focus, activate a break
  else if (currentTimer.id === "focus") {
    currentTimer = (totalPodomoros + 1) % LONG_BREAK_INTERVALS == 0 ? LONG_BREAK : SHORT_BREAK;
    totalPodomoros++; // a pomodoro is completed after every focus;
    totalPomodorosElement.textContent = totalPodomoros;
  }

  // Update view
  updateTimerComponent(currentTimer.time, 0);
  title.textContent = currentTimer.name;
}

const tick = function () {

  if (intervalId) clearInterval(intervalId);
  window.onbeforeunload = beforeUnload;

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

    if (totalSeconds === 0) stopTimer();

  }, 1000)
}

const initCountdown = function (minutes) {
  updateTimerComponent(minutes, 0);
  totalSeconds = minutesToSeconds(minutes);
  tick();
}

// Events

actionButton.addEventListener("click", function () {

  const action = this.dataset.action;
  // start the countdown
  if (action === "start") {
    playClick();
    initCountdown(currentTimer.time);
    updateActionButton("Pause");
    stopButton.style.display = "none";
    return;
  }
  else if (action === "pause") {
    clearInterval(intervalId);
    stopButton.style.display = "initial";
    updateActionButton("Continue");
  }
  else if (action === "continue") {
    if (totalSeconds > 0) {
      stopButton.style.display = "none";
      updateActionButton("Pause");
      tick();
    }
  }
});

stopButton.addEventListener("click", stopTimer);

window.onload = function () {
  updateTimerComponent(currentTimer.time, 0);
  title.textContent = currentTimer.name;
  totalPomodorosElement.textContent = totalPodomoros;
}
