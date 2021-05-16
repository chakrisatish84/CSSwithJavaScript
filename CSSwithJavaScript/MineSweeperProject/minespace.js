export const status = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
};
export function createBoard(boardSize, numberofMines) {
  const board = [];
  const minePositions = createMinePosition(boardSize, numberofMines);

  for (var x = 0; x < boardSize; x++) {
    const row = [];
    for (var y = 0; y < boardSize; y++) {
      const element = document.createElement("div");
      element.dataset.status = status.HIDDEN;
      const tile = {
        element,
        mine: minePositions.some((position) =>
          positionMatch(position, { x, y })
        ),
        x,
        y,
        get status() {
          return this.element.dataset.status;
        },
        set status(value) {
          this.element.dataset.status = value;
        },
      };
      row.push(tile);
    }
    board.push(row);
  }
  return board;
}

export function createMinePosition(boardSize, numberofMines) {
  const positions = [];

  while (positions.length < numberofMines) {
    const position = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize),
    };

    if (!positions.some((p) => positionMatch(p, position))) {
      positions.push(position);
    }
  }
  return positions;
}

function positionMatch(a, b) {
  return a.x == b.x && a.y == b.y;
}

function randomNumber(size) {
  return Math.floor(Math.random() * size);
}

export function markTile(tile) {
  if (tile.status !== status.HIDDEN && tile.status !== status.MARKED) {
    return;
  }
  if (tile.status === status.HIDDEN) {
    tile.status = status.MARKED;
  } else {
    tile.status = status.HIDDEN;
  }
}

export function revealTile(board, tile) {
  if (tile.status !== status.HIDDEN) {
    return;
  }

  if (tile.mine) {
    tile.status = status.MINE;
    return;
  }
  tile.status = status.NUMBER;
  const adjacentTiles = nearbyTiles(board, tile);
  const mineCount = adjacentTiles.filter((tile) => tile.mine).length;
  if (mineCount == 0) {
    adjacentTiles.forEach(revealTile.bind(null, board));
  } else {
    tile.element.textContent = mineCount;
  }
}

function nearbyTiles(board, { x, y }) {
  const tiles = [];
  for (let xoffSet = -1; xoffSet <= 1; xoffSet++) {
    for (let yoffSet = -1; yoffSet <= 1; yoffSet++) {
      const tile = board[x + xoffSet]?.[y + yoffSet];
      if (tile) tiles.push(tile);
    }
  }
  return tiles;
}

export function checkWin(board) {
  return board.every((row) => {
    return row.every((tile) => {
      return (
        tile.status === status.NUMBER ||
        (tile.mine &&
          (tile.status === status.MARKED || tile.status === status.HIDDEN))
      );
    });
  });
}
export function checkLose(board) {
  return board.some((row) => {
    return row.some((tile) => {
      return tile.status === status.MINE;
    });
  });
}
