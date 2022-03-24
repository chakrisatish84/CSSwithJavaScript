var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Grid_Cells, _Cell_cellElement, _Cell_x, _Cell_y, _Cell_tile, _Cell_mergeTile;
const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;
export class Grid {
    constructor(boardElement) {
        _Grid_Cells.set(this, void 0);
        boardElement &&
            boardElement.style.setProperty("--grid-size", `${GRID_SIZE}`);
        boardElement &&
            boardElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
        boardElement &&
            boardElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);
        __classPrivateFieldSet(this, _Grid_Cells, createCellElements(boardElement).map((cellElement, index) => {
            return new Cell(cellElement, index % GRID_SIZE, Math.floor(index / GRID_SIZE));
        }), "f");
    }
    get cells() {
        return __classPrivateFieldGet(this, _Grid_Cells, "f");
    }
    get cellsByColumn() {
        return __classPrivateFieldGet(this, _Grid_Cells, "f").reduce((cellgrid, cell) => {
            cellgrid[cell.x] = cellgrid[cell.x] || [];
            cellgrid[cell.x][cell.y] = cell;
            return cellgrid;
        }, []);
    }
    get cellsByRow() {
        return __classPrivateFieldGet(this, _Grid_Cells, "f").reduce((cellgrid, cell) => {
            cellgrid[cell.y] = cellgrid[cell.y] || [];
            cellgrid[cell.y][cell.x] = cell;
            return cellgrid;
        }, []);
    }
    get emptyCells() {
        return __classPrivateFieldGet(this, _Grid_Cells, "f").filter((cell) => {
            return cell.tile === null || cell.tile === undefined;
        });
    }
    randomEmptyCell() {
        const emptyCellsLength = this.emptyCells.length;
        let randomIndex = Math.floor(Math.random() * emptyCellsLength);
        let foudnCorrectIndex = false;
        while (!foudnCorrectIndex || emptyCellsLength == 0) {
            if (__classPrivateFieldGet(this, _Grid_Cells, "f")[randomIndex].tile != null ||
                __classPrivateFieldGet(this, _Grid_Cells, "f")[randomIndex].tile != undefined) {
                foudnCorrectIndex = false;
                randomIndex = Math.floor(Math.random() * __classPrivateFieldGet(this, _Grid_Cells, "f").length);
            }
            else {
                foudnCorrectIndex = true;
            }
        }
        return __classPrivateFieldGet(this, _Grid_Cells, "f")[randomIndex];
    }
}
_Grid_Cells = new WeakMap();
export class Cell {
    constructor(cellElement, x, y) {
        _Cell_cellElement.set(this, void 0);
        _Cell_x.set(this, void 0);
        _Cell_y.set(this, void 0);
        _Cell_tile.set(this, void 0);
        _Cell_mergeTile.set(this, void 0);
        __classPrivateFieldSet(this, _Cell_cellElement, cellElement, "f");
        __classPrivateFieldSet(this, _Cell_x, x, "f");
        __classPrivateFieldSet(this, _Cell_y, y, "f");
    }
    get x() {
        return __classPrivateFieldGet(this, _Cell_x, "f");
    }
    get y() {
        return __classPrivateFieldGet(this, _Cell_y, "f");
    }
    get cellElement() {
        return __classPrivateFieldGet(this, _Cell_cellElement, "f");
    }
    get tile() {
        return __classPrivateFieldGet(this, _Cell_tile, "f");
    }
    set tile(value) {
        __classPrivateFieldSet(this, _Cell_tile, value, "f");
        if (value == null)
            return;
        __classPrivateFieldGet(this, _Cell_tile, "f").x = __classPrivateFieldGet(this, _Cell_x, "f");
        __classPrivateFieldGet(this, _Cell_tile, "f").y = __classPrivateFieldGet(this, _Cell_y, "f");
    }
    get mergeTile() {
        return __classPrivateFieldGet(this, _Cell_mergeTile, "f");
    }
    set mergeTile(value) {
        __classPrivateFieldSet(this, _Cell_mergeTile, value, "f");
        if (value == null)
            return;
        __classPrivateFieldGet(this, _Cell_mergeTile, "f").x = __classPrivateFieldGet(this, _Cell_x, "f");
        __classPrivateFieldGet(this, _Cell_mergeTile, "f").y = __classPrivateFieldGet(this, _Cell_y, "f");
    }
    canAccept(tile) {
        var _a, _b;
        return (((_a = this.tile) === null || _a === void 0 ? void 0 : _a.value) == null ||
            (__classPrivateFieldGet(this, _Cell_mergeTile, "f") == null && ((_b = this.tile) === null || _b === void 0 ? void 0 : _b.value) === (tile === null || tile === void 0 ? void 0 : tile.value)));
    }
    mergeTiles() {
        if (this.tile == null ||
            this.tile.value == undefined ||
            this.mergeTile == null ||
            this.mergeTile.value == undefined)
            return;
        this.tile.value = this.tile.value + this.mergeTile.value;
        this.mergeTile.remove();
        this.mergeTile = null;
    }
}
_Cell_cellElement = new WeakMap(), _Cell_x = new WeakMap(), _Cell_y = new WeakMap(), _Cell_tile = new WeakMap(), _Cell_mergeTile = new WeakMap();
function createCellElements(boardElement) {
    var cells = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        var cellEelement = document.createElement("div");
        cellEelement.classList.add("cell");
        boardElement === null || boardElement === void 0 ? void 0 : boardElement.append(cellEelement);
        cells.push(cellEelement);
    }
    return cells;
}
