let timerDisplay = document.getElementById("timer");

// GRABBING A QUOTE FROM api.quotable.io
let quoteTextEl = document.getElementById("quoteDisplay");
let quoteInputEl = document.getElementById("quoteInput");
let wpmCountEl = document.getElementById("wpmCount");

// EVENT LISTENERS
window.addEventListener("load", () => {
  initTimer();
  getQuote();
});

quoteInputEl.addEventListener("input", () => {
  // should loop over characters in input, quote and see if they match
  const arrayQuote = quoteTextEl.querySelectorAll("span");
  const arrayValues = quoteInputEl.value.split("");
  let timerCount = getTimerTime();

  //   get the WPM
  let wordCountArr = quoteInputEl.value.replace(/[^\w\s]/gi, "").split(" ");
  let currentWPMCount = Math.floor(wordCountArr.length / (timerCount / 60));

  wpmCountEl.textContent = `${currentWPMCount} words per minute`;

  //   check to see if user has correctly typed the phrase, if so, load the new quote
  let correct = true;

  arrayQuote.forEach((charSpan, idx) => {
    const char = arrayValues[idx];

    if (char == null) {
      // this means the character hasn't been typed yet
      charSpan.classList.remove("incorrect");
      charSpan.classList.remove("correct");
      correct = false;
    } else if (char === charSpan.innerText) {
      charSpan.classList.add("correct");
      charSpan.classList.remove("incorrect");
    } else {
      charSpan.classList.remove("correct");
      charSpan.classList.add("incorrect");
      correct = false;
    }
  });

  //   if we reach the end of our conditional logic and correct is still true, move to the next quote
  if (correct) renderNewQuote();
});

// we compare the start time with the elapsed time to account for setInterval's imprecision

let startTime;

const initTimer = () => {
  timerDisplay.innerText = 0;
  startTime = new Date();

  let timerInterval = setInterval(() => {
    timerDisplay.innerText = getTimerTime();
  }, 1000);
};

const getTimerTime = () => {
  // get the elapsed time in seconds
  return Math.floor((new Date() - startTime) / 1000);
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
  initTimer();
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
