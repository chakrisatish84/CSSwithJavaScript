import { Cell, Grid } from "./grid.js";
import { Tile } from "./tile.js";

const body: HTMLBodyElement = document.querySelector("body") as HTMLBodyElement;
const gameBoard: HTMLDivElement = document.createElement("div");
gameBoard.classList.add("game-board");

body.appendChild(gameBoard);

var grid = new Grid(gameBoard);

//Initally create two tile elements

grid.randomEmptyCell().tile = new Tile(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);

// Stat user key inteaction.
setUpInput();

function setUpInput() {
  window.addEventListener("keydown", handleInput, { once: true });
}

async function handleInput(e: KeyboardEvent) {
  const key = e.key;
  switch (key) {
    case "ArrowUp":
      if (!canMoveUp()) {
        setUpInput();
        return;
      }
      await moveUp();
      break;
    case "ArrowDown":
      if (!canMoveDown()) {
        setUpInput();
        return;
      }
      await moveDown();
      break;

    case "ArrowLeft":
      if (!canMoveLeft()) {
        setUpInput();
        return;
      }
      await moveLeft();
      break;

    case "ArrowRight":
      if (!canMoveRight()) {
        setUpInput();
        return;
      }
      await moveRight();
      break;

    default:
      setUpInput();
      return;
  }

  grid.cells.map((cell: Cell) => cell.mergeTiles());

  let newTile = null;

  const generateCell = grid.randomEmptyCell();
  if (!!generateCell) {
    if (generateCell?.tile == null || generateCell?.tile == undefined) {
      newTile = new Tile(gameBoard);
      generateCell.tile = newTile;
    }
  }

  if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
    newTile?.waitForTransistionEnd(true).then(() => {
      alert("You lose");
    });
  }

  setUpInput();
}

function moveUp() {
    return slideTiles(grid.cellsByColumn);
}
  

function moveDown() {
  return slideTiles(
    grid.cellsByColumn.map((column: Cell[]) => [...column].reverse())
  );
}

function moveLeft() {
  return slideTiles(grid.cellsByRow);
}

function moveRight() {
  return slideTiles(
    grid.cellsByRow.map((column: Cell[]) => [...column].reverse())
  );
}

function slideTiles(cellsByColumn: Cell[][]) {
  return Promise.all(
    cellsByColumn.flatMap((group: Cell[]) => {
      const promises = [];
      for (let i = 1; i < group.length; i++) {
        const cell = group[i];
        if (cell.tile == null) continue; // if selected cell is not having a tile, Don't move that
        let lastValidCell: Cell | null = null; // Find a vaid cell when we can move the current tile
        for (let j = i - 1; j >= 0; j--) {
          const movetoCell = group[j];
          if (!movetoCell.canAccept(cell.tile)) return;
          lastValidCell = movetoCell;
        }
        if (!!lastValidCell) {
          promises.push(cell.tile.waitForTransistionEnd());
          if (!!lastValidCell.tile) {
            lastValidCell.mergeTile = cell.tile;
          } else {
            lastValidCell.tile = cell.tile;
          }

          cell.tile = null;
        }
      }
      return promises;
    })
  );
}

function canMoveUp() {
  return canMove(grid.cellsByColumn);
}

function canMoveDown() {
  return canMove(
    grid.cellsByColumn.map((column: Cell[]) => [...column].reverse())
  );
}

function canMoveLeft() {
  return canMove(grid.cellsByRow);
}

function canMoveRight() {
  return canMove(grid.cellsByRow.map((row: Cell[]) => [...row].reverse()));
}

function canMove(cells: Cell[][]) {
  return cells.some((group: Cell[]) => {
    return group.some((cell: Cell, index: number) => {
      if (index === 0) return false;
      if (cell.tile === null || cell.tile === undefined) return false;
      const moveToCell = group[index - 1];
      return moveToCell.canAccept(cell.tile);
    });
  });
}
