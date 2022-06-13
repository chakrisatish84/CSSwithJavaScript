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
const body = document.querySelector("body");
const gameBoard = document.createElement("div");
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
function handleInput(e) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = e.key;
        switch (key) {
            case "ArrowUp":
                if (!canMoveUp()) {
                    setUpInput();
                    return;
                }
                yield moveUp();
                break;
            case "ArrowDown":
                if (!canMoveDown()) {
                    setUpInput();
                    return;
                }
                yield moveDown();
                break;
            case "ArrowLeft":
                if (!canMoveLeft()) {
                    setUpInput();
                    return;
                }
                yield moveLeft();
                break;
            case "ArrowRight":
                if (!canMoveRight()) {
                    setUpInput();
                    return;
                }
                yield moveRight();
                break;
            default:
                setUpInput();
                return;
        }
        grid.cells.map((cell) => cell.mergeTiles());
        let newTile = null;
        const generateCell = grid.randomEmptyCell();
        if (!!generateCell) {
            if ((generateCell === null || generateCell === void 0 ? void 0 : generateCell.tile) == null || (generateCell === null || generateCell === void 0 ? void 0 : generateCell.tile) == undefined) {
                newTile = new Tile(gameBoard);
                generateCell.tile = newTile;
            }
        }
        if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
            newTile === null || newTile === void 0 ? void 0 : newTile.waitForTransistionEnd(true).then(() => {
                alert("You lose");
            });
        }
        setUpInput();
    });
}
function moveUp() {
    return slideTiles(grid.cellsByColumn);
}
function moveDown() {
    return slideTiles(grid.cellsByColumn.map((column) => [...column].reverse()));
}
function moveLeft() {
    return slideTiles(grid.cellsByRow);
}
function moveRight() {
    return slideTiles(grid.cellsByRow.map((column) => [...column].reverse()));
}
function slideTiles(cellsByColumn) {
    return Promise.all(cellsByColumn.flatMap((group) => {
        const promises = [];
        for (let i = 1; i < group.length; i++) {
            const cell = group[i];
            if (cell.tile == null)
                continue; // if selected cell is not having a tile, Don't move that
            let lastValidCell = null; // Find a vaid cell when we can move the current tile
            for (let j = i - 1; j >= 0; j--) {
                const movetoCell = group[j];
                if (!movetoCell.canAccept(cell.tile))
                    return;
                lastValidCell = movetoCell;
            }
            if (!!lastValidCell) {
                promises.push(cell.tile.waitForTransistionEnd());
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
    return canMove(grid.cellsByColumn);
}
function canMoveDown() {
    return canMove(grid.cellsByColumn.map((column) => [...column].reverse()));
}
function canMoveLeft() {
    return canMove(grid.cellsByRow);
}
function canMoveRight() {
    return canMove(grid.cellsByRow.map((row) => [...row].reverse()));
}
function canMove(cells) {
    return cells.some((group) => {
        return group.some((cell, index) => {
            if (index === 0)
                return false;
            if (cell.tile === null || cell.tile === undefined)
                return false;
            const moveToCell = group[index - 1];
            return moveToCell.canAccept(cell.tile);
        });
    });
}
