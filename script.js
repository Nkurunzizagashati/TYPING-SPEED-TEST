const RANDOM_QUOTE_API = "http://api.quotable.io/random";

let timer = 0;
const timerElement = document.getElementById("timer");

const quoteDisplayElement = document.getElementById("quote-display");
const quoteInputElement = document.getElementById("quote-input");

quoteInputElement.addEventListener("input", function () {
  validateCharsOnType();
});

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API)
    .then((response) => response.json())
    .then((data) => data.content);
}
function validateCharsOnType() {
  const displayCharsArray = document.querySelectorAll("span");
  const inputValueArray = document
    .getElementById("quote-input")
    .value.split("");

  displayCharsArray.forEach((span, index) => {
    const character = inputValueArray[index];
    if (!character) {
      span.classList.remove("correct");
      span.classList.remove("incorrect");
    } else if (span.textContent === character) {
      if (displayCharsArray.length >= index + 2) {
        displayCharsArray[index + 1].classList.add("highlighted");
      }
      span.classList.remove("highlighted");
      span.classList.remove("incorrect");
      span.classList.add("correct");
    } else {
      if (displayCharsArray.length >= index + 2) {
        displayCharsArray[index + 1].classList.add("highlighted");
      }
      span.classList.remove("highlighted");
      span.classList.remove("correct");
      span.classList.add("incorrect");
    }
  });
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerText = "";
  quote.split("").forEach((character) => {
    const spanElement = document.createElement("span");
    spanElement.innerText = character;
    quoteDisplayElement.appendChild(spanElement);
  });
  quoteInputElement.value = null;
  startTimer();
  console.log(timer);
}

let startTime = new Date();
function startTimer() {
  setInterval(() => {
    getCurrenttime();
    timerElement.innerHTML = timer;
  }, 1000);
}

function getCurrenttime() {
  timer = Math.floor((new Date() - startTime) / 1000);
}

renderNewQuote();
