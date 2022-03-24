var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Grid } from "./grid.js";
import { Tile } from "./tile.js";
const boardElement = document.querySelector(".board");
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
    if ((emptyCell2 === null || emptyCell2 === void 0 ? void 0 : emptyCell2.tile) == null || (emptyCell2 === null || emptyCell2 === void 0 ? void 0 : emptyCell2.tile) == undefined) {
        emptyCell2.tile = new Tile(boardElement);
    }
}
const setInput = () => {
    window.addEventListener("keydown", handleInput, { once: true });
};
setInput();
function handleInput(e) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (e.key) {
            case "ArrowUp":
                if (!canMoveUp()) {
                    setInput();
                    return;
                }
                yield arrowUp();
                break;
            case "ArrowDown":
                if (!canMoveDown()) {
                    setInput();
                    return;
                }
                yield arrowDown();
                break;
            case "ArrowLeft":
                if (!canMoveLeft()) {
                    setInput();
                    return;
                }
                yield arrowLeft();
                break;
            case "ArrowRight":
                if (!canMoveRight()) {
                    setInput();
                    return;
                }
                yield arrowRight();
                break;
            default:
                yield setInput();
                return;
        }
        grid.cells.forEach((cell) => cell.mergeTiles());
        let newTile = null;
        const generateCell = grid.randomEmptyCell();
        if (!!generateCell) {
            if ((generateCell === null || generateCell === void 0 ? void 0 : generateCell.tile) == null || (generateCell === null || generateCell === void 0 ? void 0 : generateCell.tile) == undefined) {
                newTile = new Tile(boardElement);
                generateCell.tile = newTile;
            }
        }
        if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
            newTile === null || newTile === void 0 ? void 0 : newTile.waitForTransistion(true).then(() => {
                alert("You lose");
            });
            return;
        }
        setInput();
    });
}
function arrowUp() {
    slideTiles(grid.cellsByRow);
}
function arrowDown() {
    slideTiles(grid.cellsByRow.map((row) => [...row].reverse()));
}
function arrowLeft() {
    slideTiles(grid.cellsByColumn);
}
function arrowRight() {
    slideTiles(grid.cellsByColumn.map((column) => [...column].reverse()));
}
function slideTiles(cellsByColumn) {
    return Promise.all(cellsByColumn.flatMap((group) => {
        let promises = [];
        for (let i = 1; i < group.length; i++) {
            let cell = group[i];
            if (cell.tile === null || cell.tile == undefined)
                continue;
            let lastValidCell = null;
            for (let j = i - 1; j >= 0; j--) {
                let movetoCell = group[j];
                if (!movetoCell.canAccept(cell.tile))
                    break;
                lastValidCell = movetoCell;
            }
            if (!!lastValidCell) {
                promises.push(cell.tile.waitForTransistion());
                if (!!lastValidCell.tile) {
                    lastValidCell.mergeTile = cell.tile;
                }
                else {
                    lastValidCell.tile = cell.tile;
                }
                cell.tile = null;
            }
        }
        return promises;
    }));
}
function canMoveUp() {
    return canMove(grid.cellsByRow);
}
function canMoveDown() {
    return canMove(grid.cellsByRow.map((row) => [...row].reverse()));
}
function canMoveLeft() {
    return canMove(grid.cellsByColumn);
}
function canMoveRight() {
    return canMove(grid.cellsByColumn.map((column) => [...column].reverse()));
}
function canMove(cellsByColumn) {
    return cellsByColumn.some((group) => {
        return group.some((cell, index) => {
            if (index === 0)
                return false;
            if (cell.tile == null)
                return false;
            const movetoCell = group[index - 1];
            return movetoCell.canAccept(cell.tile);
        });
    });
}
