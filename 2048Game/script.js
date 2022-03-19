import Grid from "./Grid.js";
import Tile from "./Tile.js";

var gridElement = document.querySelector(".board");

var grid = new Grid(gridElement);

grid.randomEmptyCells().tile = new Tile(gridElement);
grid.randomEmptyCells().tile = new Tile(gridElement);

setupInput();

function setupInput() {
  window.addEventListener("keydown", handelInput, { once: true });
}

async function handelInput(e) {
  switch (e.key) {
    case "ArrowUp":
      if (!canMoveUp) {
        setupInput();
        return;
      }
      await mouseUP();
      break;
    case "ArrowDown":
      if (!canMoveDown) {
        setupInput();
        return;
      }
      await mouseDown();
      break;
    case "ArrowLeft":
      if (!canMoveLeft) {
        setupInput();
        return;
      }
      await mouseLeft();
      break;
    case "ArrowRight":
      if (!canMoveRight) {
        setupInput();
        return;
      }
      await mouseRight();
      break;
    default:
      setupInput();
      return;
  }

  grid.cells.forEach((cell) => cell.mergeTiles());

  const newTile = new Tile(gridElement);
  grid.randomEmptyCells().tile = newTile;

  if(!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()){
      newTile.waitForTranisition(true).then(()=>{
          alert("You lose");
      })
      return;
  }
  setupInput();
}

function mouseUP() {
  slideTiles(grid.cellsByColumn);
}

function mouseDown() {
  slideTiles(grid.cellsByColumn.map((column) => [...column].reverse()));
}

function mouseLeft() {
  slideTiles(grid.cellsByRow);
}

function mouseRight() {
  slideTiles(grid.cellsByRow.map((row) => [...row].reverse()));
}
function slideTiles(cells) {
  return Promise.all(
    cells.flatMap((group) => {
      const promises = [];
      for (let i = 1; i < group.length; i++) {
        const cell = group[i];
        if (cell.tile == null) continue;
        let lastValidCell;
        for (let j = i - 1; j >= 0; j--) {
          const movetoCell = group[j];
          if (!movetoCell.canAccept(cell.tile)) break;
          lastValidCell = movetoCell;
        }
        if (lastValidCell != null) {
          promises.push(cell.tile.waitForTranisition());
          if (lastValidCell.tile != null) {
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
  return canMove(grid.cellsByColumn.map(column => [...column].reverse()));
}

function canMoveLeft() {
  return canMove(grid.cellsByRow);
}

function canMoveRight() {
  return canMove(grid.cellsByRow.map(row => [...row].reverse()));
}

function canMove(cells) {
  return cells.some((group) => {
    return group.some((cell, index) => {
      if ((index == 0)) return false;
      if (cell.tile == null) return false;
      const moveToCell = group[index - 1];
      return moveToCell.canAccept(cell.tile);
    });
  });
}
