export class Tile {
  #tileElement: HTMLDivElement;
  #value: number = 0;
  #x?: number;
  #y?: number;
  constructor(
    gameBaord: HTMLDivElement,
    value: number = Math.random() > 0.5 ? 2 : 4
  ) {
    this.#tileElement = document.createElement("div") as HTMLDivElement;
    this.#tileElement.classList.add("tile");
    gameBaord.appendChild(this.#tileElement);
    this.value = value;
  }

  get value() {
    return this.#value;
  }

  set value(v: number) {
    this.#tileElement.textContent = v.toString();
    this.#value = v;
    const power = Math.log2(v);
    const backgroundLightNess = 100 - power * 9;
    this.#tileElement.style.setProperty(
      "--background-lightness",
      `${backgroundLightNess}%`
    );
    this.#tileElement.style.setProperty(
      "--text-lightness",
      `${backgroundLightNess <= 50 ? 90 : 20}%`
    );
  }

  set x(val: number) {
    this.#x = val;
    this.#tileElement.style.setProperty("--x", this.#x.toString());
  }

  set y(val: number) {
    this.#y = val;
    this.#tileElement.style.setProperty("--y", this.#y.toString());
  }

  remove() {
    this.#tileElement.remove();
  }

  waitForTransistionEnd(animation = false): any {
    return new Promise((resolve) => {
      this.#tileElement.addEventListener(
        animation ? "animationend" : "transitionend",
        resolve,
        {
          once: true,
        }
      );
    });
  }
}
