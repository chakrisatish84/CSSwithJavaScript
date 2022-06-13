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
var _Grid_instances, _Grid_cells, _Grid_emptyCells_get, _Cell_x, _Cell_y, _Cell_tile, _Cell_mergeTile;
const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;
export class Grid {
    constructor(gameBoard) {
        _Grid_instances.add(this);
        _Grid_cells.set(this, void 0);
        gameBoard.style.setProperty("--grid-size", GRID_SIZE.toString());
        gameBoard.style.setProperty("--cell-size", CELL_SIZE.toString() + "vmin");
        gameBoard.style.setProperty("--cell-gap", CELL_GAP.toString() + "vmin");
        __classPrivateFieldSet(this, _Grid_cells, createCellElements(gameBoard).map((cellElement, index) => {
            return new Cell(cellElement, index % GRID_SIZE, Math.floor(index / GRID_SIZE));
        }), "f");
    }
    get cells() {
        return __classPrivateFieldGet(this, _Grid_cells, "f");
    }
    get cellsByColumn() {
        return __classPrivateFieldGet(this, _Grid_cells, "f").reduce((cellGrid, cell) => {
            cellGrid[cell.x] = cellGrid[cell.x] || [];
            cellGrid[cell.x][cell.y] = cell;
            return cellGrid;
        }, []);
    }
    get cellsByRow() {
        return __classPrivateFieldGet(this, _Grid_cells, "f").reduce((cellGrid, cell) => {
            cellGrid[cell.y] = cellGrid[cell.y] || [];
            cellGrid[cell.y][cell.x] = cell;
            return cellGrid;
        }, []);
    }
    randomEmptyCell() {
        const randomIndex = Math.floor(Math.random() * __classPrivateFieldGet(this, _Grid_instances, "a", _Grid_emptyCells_get).length);
        return __classPrivateFieldGet(this, _Grid_instances, "a", _Grid_emptyCells_get)[randomIndex];
    }
}
_Grid_cells = new WeakMap(), _Grid_instances = new WeakSet(), _Grid_emptyCells_get = function _Grid_emptyCells_get() {
    return __classPrivateFieldGet(this, _Grid_cells, "f").filter((cell) => {
        return cell.tile === null || cell.tile == undefined;
    });
};
function createCellElements(gameBoard) {
    const cells = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        gameBoard.appendChild(cellElement);
        cells.push(cellElement);
    }
    return cells;
}
export class Cell {
    constructor(cellElement, x, y) {
        _Cell_x.set(this, void 0);
        _Cell_y.set(this, void 0);
        _Cell_tile.set(this, void 0);
        _Cell_mergeTile.set(this, void 0);
        this.cellElement = cellElement;
        __classPrivateFieldSet(this, _Cell_x, x, "f");
        __classPrivateFieldSet(this, _Cell_y, y, "f");
    }
    get x() {
        return __classPrivateFieldGet(this, _Cell_x, "f");
    }
    get y() {
        return __classPrivateFieldGet(this, _Cell_y, "f");
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
    set mergeTile(val) {
        __classPrivateFieldSet(this, _Cell_mergeTile, val, "f");
        if (val == null)
            return;
        __classPrivateFieldGet(this, _Cell_mergeTile, "f").x = __classPrivateFieldGet(this, _Cell_x, "f");
        __classPrivateFieldGet(this, _Cell_mergeTile, "f").y = __classPrivateFieldGet(this, _Cell_y, "f");
    }
    canAccept(tile) {
        return (this.tile == null ||
            this.tile == undefined ||
            (this.mergeTile == null && this.tile.value === (tile === null || tile === void 0 ? void 0 : tile.value)));
    }
    mergeTiles() {
        if (this.tile == null ||
            this.tile == undefined ||
            this.mergeTile == null ||
            this.mergeTile == undefined)
            return;
        this.tile.value = this.tile.value + this.mergeTile.value;
        this.mergeTile.remove();
        this.mergeTile = null;
    }
}
_Cell_x = new WeakMap(), _Cell_y = new WeakMap(), _Cell_tile = new WeakMap(), _Cell_mergeTile = new WeakMap();
