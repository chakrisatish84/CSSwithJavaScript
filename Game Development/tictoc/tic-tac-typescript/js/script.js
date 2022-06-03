import { handleClick, X_CLASS, CIRCLE_CLASS, setBoardHoverClass, } from "./GameLogic.js";
const GRID_SIZE = 3;
const body = document.querySelector("body");
//Create a Parent element.
export const boardElement = document.createElement("div");
boardElement.classList.add("board");
body.appendChild(boardElement);
//Create cell elements
for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.dataset.cell = "";
    boardElement.appendChild(cellElement);
}
//wininning message container
export const winningMessageContainer = document.createElement("div");
winningMessageContainer.classList.add("winnning-message-container");
//Create and add reset button and span(to show the message)
export const messageElement = document.createElement("span");
messageElement.textContent = "";
messageElement.classList.add("message");
export const resetButton = document.createElement("button");
resetButton.textContent = "Reset";
resetButton.classList.add("button");
winningMessageContainer.appendChild(messageElement);
winningMessageContainer.appendChild(resetButton);
body.appendChild(winningMessageContainer);
//Add listner to restButton.
resetButton.addEventListener("click", startGame);
// Game Logic.
export const cells = document.querySelectorAll("[data-cell]");
startGame();
function startGame() {
    // cells = document.querySelectorAll("[data-cell]");
    cells.forEach((cell) => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick);
    });
    setBoardHoverClass();
    winningMessageContainer.classList.remove("show");
}
