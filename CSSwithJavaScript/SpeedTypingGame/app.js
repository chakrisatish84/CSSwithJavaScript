const randomUrl = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";
const quoteDisplayElement = document.querySelector(".quote-display");
const quoteInputElement = document.querySelector("#quoteInput");
const timerElement = document.querySelector(".timer");

quoteInputElement.addEventListener("input", () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll("span");
    const arrayInputValue = quoteInputElement.value.split("");
  
    let correct = true;
    arrayQuote.forEach((characterSpan, index) => {
      const typedCharacter = arrayInputValue[index];
      if (typedCharacter == null) {
        characterSpan.classList.remove("correct");
        characterSpan.classList.remove("incorrect");
        correct = false;
      } else if (typedCharacter == characterSpan.innerText) {
        characterSpan.classList.add("correct");
        characterSpan.classList.remove("incorrect");
      } else {
        characterSpan.classList.remove("correct");
        characterSpan.classList.add("incorrect");
        correct = false;
      }
    });
  
    if (correct) {
      renderNewQuote();
    }
  });

const getRandomQuotes = () => {
  return fetch(randomUrl)
    .then(response => response.json())
    .then(data => data.message);
};

const getTimerTime = () => {
  return Math.floor((new Date() - startTime) / 1000);
};

let startTime;
const startTimer = () => {
  timerElement.innerText = "0";
  startTime = new Date();
  setInterval(() => {
    timerElement.innerText = getTimerTime();
  }, 1000);
};

const renderNewQuote = async () => {
  const quote = await getRandomQuotes();
  quoteDisplayElement.innerHTML = "";
  quote.split("").forEach(character => {
    const characterSpanElement = document.createElement("span");
    characterSpanElement.innerText = character;
    quoteDisplayElement.appendChild(characterSpanElement);
  });
  quoteInputElement.value = null;
  startTimer();
};

renderNewQuote();


