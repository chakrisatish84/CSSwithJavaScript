const Grid_Size = 4;
const Cell_Size = 20;
const Cell_Gap = 2;

// --grid-size: 4;
// --cell-size: 20vmin;
// --cell-gap:2vmin;
export default class Grid {
  #cells;
  constructor(gridElement) {
    gridElement.style.setProperty("--grid-size", Grid_Size);
    gridElement.style.setProperty("--cell-size", `${Cell_Size}vmin`);
    gridElement.style.setProperty("--cell-gap", `${Cell_Gap}vmin`);

    this.#cells = createCellElements(gridElement).map((cellElement, index) => {
      return new Cell(
        cellElement,
        index % Grid_Size,
        Math.floor(index / Grid_Size)
      );
    });
    console.log(this.#cells);
  }

  get cells(){
      return this.#cells;
  }
  get cellsByColumn() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.x] = cellGrid[cell.x] || [];
      cellGrid[cell.x][cell.y] = cell;
      return cellGrid;
    }, []);
  }

  get cellsByRow() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.y] = cellGrid[cell.y] || [];
      cellGrid[cell.y][cell.x] = cell;
      return cellGrid;
    }, []);
  }

  get #emptyCells() {
    return this.#cells.filter((cell) => cell.tile == null);
  }

  randomEmptyCells() {
    const randomIndex = Math.floor(Math.random() * this.#emptyCells.length);
    return this.#cells[randomIndex];
  }
}

class Cell {
  #cellElement;
  #x;
  #y;
  #tile;
  #mergeTile;
  constructor(cellElement, x, y) {
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

  get tile() {
    return this.#tile;
  }

  set tile(value) {
    this.#tile = value;
    if (value == null) return;

    this.#tile.x = this.#x;
    this.#tile.y = this.#y;
  }

  get mergeTile() {
    return this.#mergeTile;
  }

  set mergeTile(value) {
    this.#mergeTile = value;
    if (value == null) return;

    this.#mergeTile.x = this.#x;
    this.#mergeTile.y = this.#y;
  }

  canAccept(tile) {
    return (
      this.tile == null ||
      (this.mergeTile == null && this.tile.value == tile.value)
    );
  }

  mergeTiles() {
    if (this.tile == null || this.mergeTile == null) return;
    this.tile.value = this.tile.value + this.mergeTile.value;
    this.mergeTile.remove();
    this.mergeTile = null;
  }
}

function createCellElements(gridElement) {
  const cells = [];
  for (let i = 0; i < Grid_Size * Grid_Size; i++) {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    gridElement.append(cellElement);
    cells.push(cellElement);
  }
  return cells;
}
