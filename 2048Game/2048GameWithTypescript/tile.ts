export class Tile {
  #tileElement;
  #x?: number;
  #y?: number;
  #value?: number;
  constructor(
    boardElement: HTMLDivElement | null,
    val: number = Math.random() > 0.5 ? 2 : 4
  ) {
    this.#tileElement = document.createElement("div");
    this.#tileElement.classList.add("tile");
    boardElement?.append(this.#tileElement);
    this.value = val;
  }

  get value(): number | undefined {
    return this.#value;
  }
  set value(val: number | undefined) {
    this.#value = val;
    this.#tileElement.textContent = `${val}`;
    const power = !!val ? Math.log2(val) : 2;
    const backgroudLightness = 100 - power * 9;
    this.#tileElement.style.setProperty(
      "--background-lightness",
      `${backgroudLightness}%`
    );
    this.#tileElement.style.setProperty(
      "--text-lightness",
      `${backgroudLightness < 50 ? 90 : 10}%`
    );
  }

  get x() {
    return this.#x;
  }
  set x(value: number | undefined) {
    this.#x = value;
    this.#tileElement.style.setProperty("--x", `${value}`);
  }
  get y() {
    return this.#y;
  }
  set y(value: number | undefined) {
    this.#y = value;
    this.#tileElement.style.setProperty("--y", `${value}`);
  }

  remove() {
    this.#tileElement.remove();
  }

  waitForTransistion(animation: boolean = false) {
    return new Promise((resolve) => {
      this.#tileElement.addEventListener(
        animation ? "animationEnd" : "transitionEnd",
        resolve,
        { once: true }
      );
    });
  }
}
