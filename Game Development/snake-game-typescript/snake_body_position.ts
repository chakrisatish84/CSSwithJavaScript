export class snake_body_position {
  #x: number;
  #y: number;
  /**
   *
   */
  constructor(x: number, y: number) {
    this.#x = x;
    this.#y = y;
  }

  get xPosition() {
    return this.#x;
  }

  set xPosition(value: number) {
    this.#x = value;
  }

  get yPosition() {
    return this.#y;
  }

  set yPosition(value: number) {
    this.#y = value;
  }
}
