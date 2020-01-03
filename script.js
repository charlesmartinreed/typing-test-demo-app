window.addEventListener("load", () => {
  //   initTimer();
});

let timerDisplay = document.getElementById("timer");
let timerCount = 10;

const initTimer = () => {
  timerDisplay.textContent = timerCount;
  let countdownInterval = setInterval(() => {
    if (timerCount > 0) {
      timerCount--;
    }
    timerDisplay.textContent = timerCount;
  }, 1000);
};
