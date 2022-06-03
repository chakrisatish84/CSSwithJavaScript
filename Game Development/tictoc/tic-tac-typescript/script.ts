import {
  handleClick,
  X_CLASS,
  CIRCLE_CLASS,
  setBoardHoverClass,
} from "./GameLogic.js";

const GRID_SIZE: number = 3;
const body = document.querySelector("body") as HTMLBodyElement;

//Create a Parent element.
export const boardElement: HTMLDivElement = document.createElement(
  "div"
) as HTMLDivElement;
boardElement.classList.add("board");
body.appendChild(boardElement);

//Create cell elements
for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
  const cellElement: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  cellElement.classList.add("cell");
  cellElement.dataset.cell = "";
  boardElement.appendChild(cellElement);
}

//wininning message container
export const winningMessageContainer: HTMLDivElement =
  document.createElement("div");
winningMessageContainer.classList.add("winnning-message-container");

//Create and add reset button and span(to show the message)
export const messageElement: HTMLSpanElement = document.createElement("span");
messageElement.textContent = "";
messageElement.classList.add("message");

export const resetButton: HTMLButtonElement = document.createElement("button");
resetButton.textContent = "Reset";
resetButton.classList.add("button");

winningMessageContainer.appendChild(messageElement);
winningMessageContainer.appendChild(resetButton);

body.appendChild(winningMessageContainer);

//Add listner to restButton.
resetButton.addEventListener("click", startGame);

// Game Logic.
export const cells: NodeListOf<HTMLDivElement> = document.querySelectorAll(
  "[data-cell]"
) as NodeListOf<HTMLDivElement>;

startGame();

function startGame() {
  // cells = document.querySelectorAll("[data-cell]");

  cells.forEach((cell: HTMLDivElement) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick);
  });
  setBoardHoverClass();
  winningMessageContainer.classList.remove("show");
}
