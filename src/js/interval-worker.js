let intervalId = null;

const calcRemaindingTime = function (totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return { minutes, seconds, total: totalSeconds }
}

const startTimer = function (seconds) {

  seconds--;
  postMessage(calcRemaindingTime(seconds));

  intervalId = setInterval(function () {
    seconds--;
    postMessage(calcRemaindingTime(seconds));
    if (seconds === 0) clearInterval(intervalId);
  }, 1000);

}

onmessage = function (event) {
  const { data } = event;

  if (data.action === "start") {
    clearInterval(intervalId);
    startTimer(data.seconds);
  } else if (data.action === "stop") {
    clearInterval(intervalId);
  }

}