const DEFAULT_TIME_IN_MINUTES = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15
}

// Select elements from the DOM
const minutesElement = document.querySelector("span.minutes");
const secondsElement = document.querySelector("span.seconds");
const startButton = document.querySelector("button#start-button");

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

const initCountdown = function (minutes) {

  let totalSeconds = minutesToSeconds(minutes);

  const intervalId = setInterval(function () {

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

startButton.addEventListener("click", function () {
  initCountdown(DEFAULT_TIME_IN_MINUTES.focus);
});

window.onload = function () {
  // minutesElement.textContent = DEFAULTS.pomodoroTime;
}
