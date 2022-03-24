import { Tile } from "./tile";

const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;
export class Grid {
  #Cells: Cell[];

  constructor(boardElement: HTMLDivElement | null) {
    boardElement &&
      boardElement.style.setProperty("--grid-size", `${GRID_SIZE}`);
    boardElement &&
      boardElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
    boardElement &&
      boardElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);

    this.#Cells = createCellElements(boardElement).map(
      (cellElement: HTMLDivElement, index) => {
        return new Cell(
          cellElement,
          index % GRID_SIZE,
          Math.floor(index / GRID_SIZE)
        );
      }
    );
  }

  get cells() {
    return this.#Cells;
  }

  get cellsByColumn() {
    return this.#Cells.reduce((cellgrid, cell) => {
      cellgrid[cell.x] = cellgrid[cell.x] || [];
      cellgrid[cell.x][cell.y] = cell;
      return cellgrid;
    }, [] as any);
  }

  get cellsByRow() {
    return this.#Cells.reduce((cellgrid, cell) => {
      cellgrid[cell.y] = cellgrid[cell.y] || [];
      cellgrid[cell.y][cell.x] = cell;
      return cellgrid;
    }, [] as any);
  }

  get emptyCells() {
    return this.#Cells.filter((cell: Cell) => {
      return cell.tile === null || cell.tile === undefined;
    });
  }

  randomEmptyCell() {
    const emptyCellsLength = this.emptyCells.length;
    let randomIndex = Math.floor(Math.random() * emptyCellsLength);
    let foudnCorrectIndex = false;
    while (!foudnCorrectIndex || emptyCellsLength == 0) {
      if (
        this.#Cells[randomIndex].tile != null ||
        this.#Cells[randomIndex].tile != undefined
      ) {
        foudnCorrectIndex = false;
        randomIndex = Math.floor(Math.random() * this.#Cells.length);
      } else {
        foudnCorrectIndex = true;
      }
    }
    return this.#Cells[randomIndex];
  }
}

export class Cell {
  #cellElement;
  #x: number;
  #y: number;
  #tile: any;
  #mergeTile: any;
  constructor(cellElement: HTMLDivElement, x: number, y: number) {
    this.#cellElement = cellElement;
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get cellElement() {
    return this.#cellElement;
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

  set mergeTile(value: Tile | null) {
    this.#mergeTile = value;
    if (value == null) return;
    this.#mergeTile.x = this.#x;
    this.#mergeTile.y = this.#y;
  }

  canAccept(tile: Tile) {
    return (
      this.tile?.value == null ||
      (this.#mergeTile == null && this.tile?.value === tile?.value)
    );
  }

  mergeTiles() {
    if (
      this.tile == null ||
      this.tile.value == undefined ||
      this.mergeTile == null ||
      this.mergeTile.value == undefined
    )
      return;
    this.tile.value = this.tile.value + this.mergeTile.value;
    this.mergeTile.remove();
    this.mergeTile = null;
  }
}

function createCellElements(
  boardElement: HTMLDivElement | null
): HTMLDivElement[] {
  var cells: HTMLDivElement[] = [];
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    var cellEelement = document.createElement("div");
    cellEelement.classList.add("cell");
    boardElement?.append(cellEelement);
    cells.push(cellEelement);
  }

  return cells;
}
