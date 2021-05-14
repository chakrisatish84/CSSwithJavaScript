// 1) Populate a board with tiles/mines
// 2) Left Click on tiles
//     a. Reveal tiles
// 3) Right click on tiles
//     a.Mark tiles
//4) Check for win / Loose.

import { createBoard } from "./minespace.js";

const BOARD_SIZE = 10;
const NUMBER_OF_TILES = 2;

const board = createBoard(BOARD_SIZE, NUMBER_OF_TILES);
const boardElement = document.querySelector(".board");

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);
  });
});
boardElement.style.setProperty("--size", BOARD_SIZE);
