// 1) Populate a board with tiles/mines
// 2) Left Click on tiles
//     a. Reveal tiles
// 3) Right click on tiles
//     a.Mark tiles
//4) Check for win / Loose.

import {
  status,
  createBoard,
  markTile,
  revealTile,
  checkWin,
  checkLose,
} from "./minespace.js";

const BOARD_SIZE = 10;
const NUMBER_OF_TILES = 1;

const board = createBoard(BOARD_SIZE, NUMBER_OF_TILES);
const boardElement = document.querySelector(".board");
const minesCountText = document.querySelector("[data-mine-count]");
const subText = document.querySelector(".subtext");

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);
    tile.element.addEventListener("click", function () {
      revealTile(board, tile);
      checkGameEnd();
    });
    tile.element.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      markTile(tile);
      updateMinesCount();
    });
  });
});
boardElement.style.setProperty("--size", BOARD_SIZE);
minesCountText.textContent = NUMBER_OF_TILES;

function updateMinesCount() {
  const markedMinesCount = board.reduce((count, row) => {
    return count + row.filter((tile) => tile.status === status.MARKED).length;
  }, 0);
  minesCountText.textContent = NUMBER_OF_TILES - markedMinesCount;
}

function checkGameEnd() {
  const win = checkWin(board);
  const lose = checkLose(board);

  if (win || lose) {
    boardElement.addEventListener("click", stopProp, { capture: true });
    boardElement.addEventListener("contextmenu", stopProp, { capture: true });
  }
  if (win) {
    subText.textContent = "You Win";
  }
  if (lose) {
    subText.textContent = "You Lose";
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status === status.MARKED) markTile(tile);
        if (tile.mine) {
          revealTile(board, tile);
        }
      });
    });
  }
}

const stopProp = (e) => {
  e.stopImmediatePropagation();
};
