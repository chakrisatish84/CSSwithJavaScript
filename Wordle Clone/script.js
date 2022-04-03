const guessGrid = document.querySelector(".guess-grid");
const alertsContainer = document.querySelector(".alerts-container");
const keyboard = document.querySelector("[data-keyboard]");
const WORD_LENGTH = 5;
var targetWords = [];
let dictionaryWords = [];
let targetWord = "";
const offsetFromDate = new Date(2022, 0, 1);
const msOffset = Date.now() - offsetFromDate;
const dayOfffset = msOffset / 1000 / 60 / 60 / 24;

const FLIP_ANIMATION_DURATION = 500;
const DANCE_ANIMATION_DURATION = 500;

readJsonFiles();

function readJsonFiles() {
  Promise.all([fetch("./targetWords.json"), fetch("./dictionary.json")])
    .then((results) => {
      return Promise.all(
        results.map((result) => {
          return result.json();
        })
      ).then((data) => {
        targetWords = data[0];
        dictionaryWords = data[0];
        targetWord = targetWords[Math.floor(dayOfffset)];
        startInteraction();
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function startInteraction() {
  document.addEventListener("click", handleMouseClick);
  document.addEventListener("keydown", handleKeyPress);
  console.log(targetWord);
}

function stopInteraction() {
  document.removeEventListener("click", handleMouseClick);
  document.removeEventListener("keydown", handleKeyPress);
}

function handleMouseClick(e) {
  if (e.target.matches("[data-key]")) {
    pressKey(e.target.dataset.key);
    return;
  }

  if (e.target.matches("[data-enter]")) {
    submitGuess();
    return;
  }

  if (e.target.matches("[data-delete]")) {
    deleteKey();
    return;
  }
}

function handleKeyPress(e) {
  if (e.key === "Enter") {
    submitGuess();
    return;
  }

  if (e.key === "Backspace" || e.key === "Delete") {
    deleteKey();
    return;
  }

  if (e.key.match(/^[a-z]$/)) {
    pressKey(e.key);
    return;
  }
}

function pressKey(key) {
  const activeTiles = getActiveTiles();
  if (activeTiles.length >= WORD_LENGTH) return;
  const nextTile = guessGrid.querySelector(".tile:not([data-letter]");
  nextTile.textContent = key;
  nextTile.dataset.letter = key.toLowerCase();
  nextTile.dataset.state = "active";
}

function deleteKey() {
  const activeTiles = getActiveTiles();
  const lastTile = activeTiles[activeTiles.length - 1];
  if (lastTile == null) return;

  lastTile.textContent = "";
  delete lastTile.dataset.state;
  delete lastTile.dataset.letter;
}

function submitGuess() {
  const activeTiles = [...getActiveTiles()];
  if (activeTiles.length != WORD_LENGTH) {
    showAlert("Not enough leters");
    shakeTiles(activeTiles);
    return;
  }

  const guessWord = activeTiles.reduce((word, tile) => {
    return word + tile.dataset.letter;
  }, "");

  if (!dictionaryWords.includes(guessWord)) {
    showAlert("Not in word list");
    shakeTiles(activeTiles);
    return;
  }

  stopInteraction();
  activeTiles.forEach((...params) => flipTile(...params, guessWord));
}

function flipTile(tile, index, array, guessWord) {
  const letter = tile.dataset.letter;
  const key = keyboard.querySelector(`[data-key="${letter}"i]`);

  setTimeout(() => {
    tile.classList.add("flip");
  }, (index * FLIP_ANIMATION_DURATION) / 2);

  tile.addEventListener(
    "transitionend",
    () => {
      tile.classList.remove("flip");

      if (targetWord[index] === letter) {
        tile.dataset.state = "correct";
        key.classList.add("correct");
      } else if (targetWord.includes(letter)) {
        tile.dataset.state = "wrong-location";
        key.classList.add("wrong-location");
      } else {
        tile.dataset.state = "wrong";
        key.classList.add("wrong");
      }

      if (index === array.length - 1) {
        tile.addEventListener(
          "transitionend",
          () => {
            startInteraction();
            checkwWinLose(guessWord, array);
          },
          { once: true }
        );
      }
    },
    { once: true }
  );
}

function getActiveTiles() {
  return guessGrid.querySelectorAll('[data-state="active"]');
}

function showAlert(message, duration = 1000) {
  const alert = document.createElement("div");
  alert.textContent = message;
  alert.classList.add("alert");
  alertsContainer.prepend(alert);

  if (duration == null) return;

  setTimeout(() => {
    alert.classList.add("hide");
    alert.addEventListener("transitionend", () => {
      alert.remove();
    });
  }, duration);
}

function shakeTiles(tiles) {
  tiles.forEach((tile) => {
    tile.classList.add("shake");
    tile.addEventListener(
      "animationend",
      () => {
        tile.classList.remove("shake");
      },
      { once: true }
    );
  });
}

function checkwWinLose(guess, tiles) {
  if (guess === targetWord) {
    showAlert("You win", 5000);
    danceTiles(tiles);
    stopInteraction();
    return;
  }
}

function danceTiles(tiles) {
  tiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add("dance");
      tile.addEventListener(
        "animationend",
        () => {
          tile.classList.remove("dance");
        },
        { once: true }
      );
    }, (index * DANCE_ANIMATION_DURATION) / 5);
  });
}
