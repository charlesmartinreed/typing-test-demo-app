// GRABBING A QUOTE FROM api.quotable.io
let quoteTextEl = document.getElementById("quoteDisplay");
let quoteInputEl = document.getElementById("quoteInput");

window.addEventListener("load", () => {
  initTimer();
  getQuote();
});

let timerDisplay = document.getElementById("timer");
let timerCount = 0;

const initTimer = () => {
  timerDisplay.textContent = timerCount;
  let timerInterval = setInterval(() => {
    //   countdown
    // if (timerCount > 0) {
    //   timerCount--;
    // }
    timerCount++;
    timerDisplay.textContent = timerCount;
  }, 1000);
};

const getQuote = async () => {
  // for demo purposes with async/await, but I actually think more convention .then statements are more readable than an IIFE here.
  try {
    let res = await (await fetch("https://api.quotable.io/random")).json();
    let data = await res.content;
    return data;
  } catch (err) {
    console.error(err);
  }
};

const renderNewQuote = async () => {
  const randomQuote = await getQuote();

  //   display the quote, clear the input
  quoteTextEl.textContent = "";

  //   convert string to arr
  randomQuote.split("").forEach(character => {
    //   create span for each char, put char in span
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteTextEl.appendChild(characterSpan);
  });
  quoteInputEl.value = null;
};

renderNewQuote();
