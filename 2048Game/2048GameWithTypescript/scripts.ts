import { Cell, Grid } from "./grid.js";
import { Tile } from "./tile.js";

const boardElement: HTMLDivElement | null = document.querySelector(".board");

var grid = new Grid(boardElement);

// Creaet two tiles on every page load.
const emptyCell1 = grid.randomEmptyCell();
if (!!emptyCell1) {
  if (emptyCell1.tile == null || emptyCell1.tile == undefined) {
    emptyCell1.tile = new Tile(boardElement);
  }
}

const emptyCell2 = grid.randomEmptyCell();
if (!!emptyCell2) {
  if (emptyCell2?.tile == null || emptyCell2?.tile == undefined) {
    emptyCell2.tile = new Tile(boardElement);
  }
}

const setInput = () => {
  window.addEventListener("keydown", handleInput, { once: true });
};

setInput();

async function handleInput(e: KeyboardEvent) {
  switch (e.key) {
    case "ArrowUp":
      if (!canMoveUp()) {
        setInput();
        return;
      }
      await arrowUp();
      break;

    case "ArrowDown":
      if (!canMoveDown()) {
        setInput();
        return;
      }
      await arrowDown();
      break;

    case "ArrowLeft":
      if (!canMoveLeft()) {
        setInput();
        return;
      }
      await arrowLeft();
      break;

    case "ArrowRight":
      if (!canMoveRight()) {
        setInput();
        return;
      }
      await arrowRight();
      break;

    default:
      await setInput();
      return;
  }

  grid.cells.forEach((cell: Cell) => cell.mergeTiles());

  let newTile = null;

  const generateCell = grid.randomEmptyCell();
  if (!!generateCell) {
    if (generateCell?.tile == null || generateCell?.tile == undefined) {
      newTile = new Tile(boardElement);
      generateCell.tile = newTile;
    }
  }

  if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
    newTile?.waitForTransistion(true).then(() => {
      alert("You lose");
    });
    return;
  }

  setInput();
}
function arrowUp() {
  slideTiles(grid.cellsByRow);
}

function arrowDown() {
  slideTiles(grid.cellsByRow.map((row: any) => [...row].reverse()));
}

function arrowLeft() {
  slideTiles(grid.cellsByColumn);
}

function arrowRight() {
  slideTiles(grid.cellsByColumn.map((column: any) => [...column].reverse()));
}

function slideTiles(cellsByColumn: any) {
  return Promise.all(
    cellsByColumn.flatMap((group: any) => {
      let promises = [];
      for (let i = 1; i < group.length; i++) {
        let cell: Cell = group[i];
        if (cell.tile === null || cell.tile == undefined) continue;
        let lastValidCell: Cell | null = null;
        for (let j = i - 1; j >= 0; j--) {
          let movetoCell: Cell = group[j];
          if (!movetoCell.canAccept(cell.tile)) break;
          lastValidCell = movetoCell;
        }
        if (!!lastValidCell) {
          promises.push(cell.tile.waitForTransistion());
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
  return canMove(grid.cellsByRow);
}

function canMoveDown() {
  return canMove(grid.cellsByRow.map((row: any) => [...row].reverse()));
}

function canMoveLeft() {
  return canMove(grid.cellsByColumn);
}

function canMoveRight() {
  return canMove(
    grid.cellsByColumn.map((column: any) => [...column].reverse())
  );
}

function canMove(cellsByColumn: any) {
  return cellsByColumn.some((group: any) => {
    return group.some((cell: Cell, index: number) => {
      if (index === 0) return false;
      if (cell.tile == null) return false;
      const movetoCell = group[index - 1];
      return movetoCell.canAccept(cell.tile);
    });
  });
}
