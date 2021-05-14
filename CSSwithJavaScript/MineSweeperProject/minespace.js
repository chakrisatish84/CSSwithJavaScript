const status = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
};
export function createBoard(boardSize, numberofMines) {
  const board = [];
  for (var x = 0; x < boardSize; x++) {
    const row = [];
    for (var y = 0; y < boardSize; y++) {
      const element = document.createElement("div");
      element.dataset.status = status.HIDDEN;
      const tile = {
        element,
        x,
        y,
      };
      row.push(tile);
    }
    board.push(row);
  }
  return board;
}
