const gridRowsCount = 6;
const wordLength = 5;
const Guess_Grid_Element = document.querySelector("[data-guess-grid]");
const keyboard = document.querySelector("[data-keyboard]");
const FLIP_ANIMATION_DURATION = 500;
const DANCE_ANIMATION_DURATION = 500;
const offsetFromDate = new Date(2022, 0, 1);
const currentDate = new Date();
const msOffset = currentDate.getTime() - offsetFromDate.getTime();
const dayOfffset = msOffset / 1000 / 60 / 60 / 24;
let targetWord = "";

//Create alert container
const alertContainer = document.createElement("div");
alertContainer.dataset.alertContainer = "";
alertContainer.classList.add("alertContainer");

document.querySelector("body")?.prepend(alertContainer);

let targetWords: any;
let dictionaryWords: any;

for (let i = 0; i < gridRowsCount * 5; i++) {
  const tileElement: HTMLDivElement = document.createElement("div");
  tileElement.classList.add("tile");
  Guess_Grid_Element?.append(tileElement);
}

readWordsJosnFiles();

function readWordsJosnFiles() {
  Promise.all([fetch("./targetWords.json"), fetch("./dictionary.json")]).then(
    (responses: Response[]) => {
      return Promise.all(
        responses.map((res: Response) => {
          return res.json();
        })
      ).then((data) => {
        targetWords = data[0];
        dictionaryWords = data[1];
        targetWord = targetWords[Math.floor(dayOfffset)];
        startInteraction();
      });
    }
  );
}

function startInteraction() {
  document.addEventListener("click", handleMouseClick);
  document.addEventListener("keydown", handleKeyPress);
}

function stopInteraction() {
  document.removeEventListener("click", handleMouseClick);
  document.removeEventListener("keydown", handleKeyPress);
}

function handleMouseClick(e: any) {
  if (e.target.matches("[data-key]")) {
    presskey(e.target.dataset.key);
    return;
  }

  if (e.target.matches("[data-enter]")) {
    submitGuess();
    return;
  }

  if (e.target.matches("[data-delete]")) {
    deleteLastEntry();
    return;
  }
}

function handleKeyPress(e: KeyboardEvent) {
  const selectedKey = e.key;

  switch (selectedKey) {
    case "Enter":
      submitGuess();
      break;
    case "Delete":
    case "Backspace":
      deleteLastEntry();
      break;

    default:
      if (selectedKey.match(/^[a-z]$/)) {
        presskey(selectedKey);
      }
      break;
  }
}

function presskey(key: any) {
  const activeTiles = getActiveTiles();
  if (!!activeTiles && activeTiles.length >= wordLength) return;
  if (!!Guess_Grid_Element) {
    const nextTile: HTMLDivElement | null = Guess_Grid_Element.querySelector(
      ".tile:not([data-letter])"
    );
    if (!!nextTile) {
      nextTile.textContent = key;
      nextTile.dataset.letter = key;
      nextTile.dataset.state = "active";
    }
  }
}

function deleteLastEntry() {
  const activeTiles = getActiveTiles();
  if (!!activeTiles) {
    const lastActiveTile: HTMLDivElement | null = activeTiles[
      activeTiles.length - 1
    ] as HTMLDivElement;

    if (lastActiveTile === null) return;

    lastActiveTile.textContent = "";
    delete lastActiveTile.dataset.state;
    delete lastActiveTile.dataset.letter;
  }
}

function getActiveTiles() {
  return Guess_Grid_Element?.querySelectorAll(".tile[data-state='active']");
}

function submitGuess() {
  const activeTiles = getActiveTiles();

  if (!activeTiles) return;

  if (activeTiles.length !== wordLength) {
    showAlert("Not enough letters");
    shakeTiles(activeTiles);
  }

  const guessWord = [...activeTiles].reduce((word: string, tile: any) => {
    return word + tile.dataset.letter;
  }, "");

  if (!dictionaryWords.includes(guessWord)) {
    showAlert("Not in a word list");
    shakeTiles(activeTiles);
    return;
  }

  stopInteraction();
  [...activeTiles].forEach((...params) => filpTile(...params, guessWord));
}

function filpTile(
  tile: any,
  index: number,
  array: Element[],
  guessWord: string
): void {
  const letter = tile.dataset.letter;
  const key = keyboard?.querySelector(`[data-key="${letter}"i]`);

  setTimeout(() => {
    tile.classList.add("flip");
  }, (index * FLIP_ANIMATION_DURATION) / 2);

  tile.addEventListener(
    "transitionend",
    () => {
      tile.classList.remove("flip");
      if (targetWord[index] === letter) {
        tile.dataset.state = "correct";
        key?.classList.add("correct");
      } else if (targetWord.includes(letter)) {
        tile.dataset.state = "wrong-location";
        key?.classList.add("wrong-location");
      } else {
        tile.dataset.state = "wrong";
        key?.classList.add("wrong");
      }

      if (index == array.length - 1) {
        tile.addEventListener(
          "transitionend",
          () => {
            startInteraction();
            checkwinLose(guessWord, array);
          },
          { once: true }
        );
      }
    },
    { once: true }
  );
}

function showAlert(text: string, duration: number = 1000) {
  const newAlert = document.createElement("div");
  newAlert.classList.add("alert");
  newAlert.textContent = text;

  alertContainer.prepend(newAlert);

  if (!!duration) {
    setTimeout(() => {
      newAlert.classList.add("hide");
      newAlert.addEventListener("transitionend", () => {
        newAlert.remove();
      });
    }, duration);
  }
}
function shakeTiles(activeTiles: NodeListOf<Element>) {
  let tiles = [...activeTiles];
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
function checkwinLose(guessWord: string, tiles: Element[]) {
  if (guessWord === targetWord) {
    showAlert("You win", 5000);
    danceTiles(tiles);
    stopInteraction();
    return;
  }

  const remaingTiles = Guess_Grid_Element?.querySelectorAll(
    ":not([data-letter])"
  );

  if (remaingTiles?.length === 0) {
    showAlert(targetWord.toUpperCase(), 10000);
    stopInteraction();
  }
}
function danceTiles(tilesArray: Element[]) {
  let tiles = [...tilesArray];
  tiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add("dance");
      tile.addEventListener(
        "animationend",
        () => {
          tile.classList.remove("shake");
        },
        { once: true }
      );
    }, (index * DANCE_ANIMATION_DURATION) / 5);
  });
}