const DEFAULTS = {
  pomodoroTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15
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
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;
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
      addLeadingZero(remainingMinutes),
      addLeadingZero(remainingSeconds)
    );

    if (totalSeconds === 0) {
      clearInterval(intervalId);
    }
  }, 1000)

}

startButton.addEventListener("click", function () {
  initCountdown(DEFAULTS.pomodoroTime);
});

window.onload = function () {
  // minutesElement.textContent = DEFAULTS.pomodoroTime;
}
