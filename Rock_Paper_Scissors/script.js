const selectionButtons = document.querySelectorAll("[data-selection]");
const finalColumn = document.querySelector("[data-final-column]");
const yourScoreSpan = document.querySelector("[data-your-score ]");
const computerScoreSpan = document.querySelector("[data-computer-score]");

const SELECTIONS = [
  {
    name: "rock",
    emoji: "✊",
    beats: "scissor",
  },
  {
    name: "paper",
    emoji: "✋",
    beats: "rock",
  },
  {
    name: "scissor",
    emoji: "✌",
    beats: "paper",
  },
];
selectionButtons.forEach((selectionButton) => {
  selectionButton.addEventListener("click", (e) => {
    const selection = SELECTIONS.find(
      (SELECTION) => SELECTION.name === selectionButton.dataset.selection
    );
    makeSelection(selection);
  });
});

const makeSelection = (selection) => {
  const computerSelection = ranodmSelection();
  const youWinner = isWinner(selection, computerSelection);
  const computerWinner = isWinner(computerSelection, selection);

  addSelectionResult(computerSelection, computerWinner);
  addSelectionResult(selection, youWinner);

  if (youWinner) {
    incrementScore(yourScoreSpan);
  } if (computerWinner) {
    incrementScore(computerScoreSpan);
  }
};

const incrementScore = (scoreSpan) =>{
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}
const addSelectionResult = (selection, youWinner) => {
  const div = document.createElement("div");
  div.innerText = selection.emoji;
  div.classList.add("result-selection");
  if (youWinner) {
    div.classList.add("winner");
  }
  finalColumn.after(div);
};

const ranodmSelection = () => {
  const randonIndex = Math.floor(Math.random() * SELECTIONS.length);
  return SELECTIONS[randonIndex];
};

const isWinner = (selection, opponentSelection) => {
  return selection.beats === opponentSelection.name;
};
