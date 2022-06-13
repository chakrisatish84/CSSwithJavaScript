import { Tile } from "./tile";

const GRID_SIZE: number = 4;
const CELL_SIZE: number = 20;
const CELL_GAP: number = 2;

export class Grid {
  #cells: Cell[];
  constructor(gameBoard: HTMLDivElement) {
    gameBoard.style.setProperty("--grid-size", GRID_SIZE.toString());
    gameBoard.style.setProperty("--cell-size", CELL_SIZE.toString() + "vmin");
    gameBoard.style.setProperty("--cell-gap", CELL_GAP.toString() + "vmin");

    this.#cells = createCellElements(gameBoard).map(
      (cellElement: HTMLDivElement, index: number) => {
        return new Cell(
          cellElement,
          index % GRID_SIZE,
          Math.floor(index / GRID_SIZE)
        );
      }
    );
  }

  get cells(): Cell[] {
    return this.#cells;
  }

  get #emptyCells(): Cell[] {
    return this.#cells.filter((cell: Cell) => {
      return cell.tile === null || cell.tile == undefined;
    });
  }

  get cellsByColumn(): Cell[][] {
    return this.#cells.reduce((cellGrid, cell: Cell) => {
      cellGrid[cell.x] = cellGrid[cell.x] || [];
      cellGrid[cell.x][cell.y] = cell;
      return cellGrid;
    }, [] as any);
  }

  get cellsByRow(): Cell[][] {
    return this.#cells.reduce((cellGrid, cell: Cell) => {
      cellGrid[cell.y] = cellGrid[cell.y] || [];
      cellGrid[cell.y][cell.x] = cell;
      return cellGrid;
    }, [] as any);
  }

  randomEmptyCell(): Cell {
    const randomIndex = Math.floor(Math.random() * this.#emptyCells.length);
    return this.#emptyCells[randomIndex];
  }
}

function createCellElements(gameBoard: HTMLDivElement) {
  const cells: HTMLDivElement[] = [];
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cellElement: HTMLDivElement = document.createElement("div");
    cellElement.classList.add("cell");
    gameBoard.appendChild(cellElement);
    cells.push(cellElement);
  }

  return cells;
}

export class Cell {
  cellElement: HTMLDivElement;
  #x: number;
  #y: number;
  #tile: any;
  #mergeTile: any;
  constructor(cellElement: HTMLDivElement, x: number, y: number) {
    this.cellElement = cellElement;
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get tile() {
    return this.#tile;
  }

  set tile(value: Tile | null) {
    this.#tile = value;
    if (value == null) return;

    this.#tile.x = this.#x;
    this.#tile.y = this.#y;
  }

  get mergeTile() {
    return this.#mergeTile;
  }

  set mergeTile(val: Tile | null) {
    this.#mergeTile = val;
    if (val == null) return;

    this.#mergeTile.x = this.#x;
    this.#mergeTile.y = this.#y;
  }

  canAccept(tile: Tile | null): boolean {
    return (
      this.tile == null ||
      this.tile == undefined ||
      (this.mergeTile == null && this.tile.value === tile?.value)
    );
  }

  mergeTiles() {
    if (
      this.tile == null ||
      this.tile == undefined ||
      this.mergeTile == null ||
      this.mergeTile == undefined
    )
      return;
    this.tile.value = this.tile.value + this.mergeTile.value;
    this.mergeTile.remove();
    this.mergeTile = null;
  }
}
