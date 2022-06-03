import {
  boardElement,
  cells,
  winningMessageContainer,
  messageElement,
} from "./script.js";

export const X_CLASS = "x";
export const CIRCLE_CLASS = "circle";
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export let circleTurn: boolean = false;

const checkWin = (currentClass: string): boolean => {
  return winningCombinations.some((combination) => {
    return combination.every((index: number) => {
      return cells[index].classList.contains(currentClass);
    });
  });
};

const endGame = (draw: boolean = false) => {
  if (draw) {
    messageElement.innerText = `Draw`;
  } else {
    messageElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!s`;
  }
  winningMessageContainer.classList.add("show");
};

const isDraw = (): boolean => {
  return Array.from(cells).every((cell: HTMLDivElement) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
};

export function handleClick(ev: Event) {
  const cell = ev.target as HTMLDivElement;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  if (cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS))
    return;
  //Place the mark
  placeMark(cell, currentClass);

  //Check win

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  }

  //switch turns
  switchTurns();

  //Set Hover status
  setBoardHoverClass();
}

function placeMark(cell: HTMLDivElement, currentClass: string) {
  cell.classList.add(currentClass);
}

function switchTurns() {
  circleTurn = !circleTurn;
}

export function setBoardHoverClass() {
  boardElement.classList.remove(CIRCLE_CLASS);
  boardElement.classList.remove(X_CLASS);

  boardElement.classList.add(circleTurn ? CIRCLE_CLASS : X_CLASS);
}
