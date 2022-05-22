type QueueItem = () => Promise<void>;

export class TypeWriter {
  #element: HTMLElement;
  #loop: boolean;
  #typingSpeed: number;
  #deletingSpeed: number;
  #queue: QueueItem[] = [];
  constructor(
    parent: HTMLElement,
    { loop = false, typingSpeed = 10, deletingSpeed = 10 } = {}
  ) {
    this.#element = document.createElement("div");
    this.#element.classList.add("white-space");
    parent.append(this.#element);
    this.#loop = loop;
    this.#typingSpeed = typingSpeed;
    this.#deletingSpeed = deletingSpeed;
  }

  typeString(string: string) {
    this.#addToQueue((resolve) => {
      //Add string to the screen
      let i = 0;
      const intervel = setInterval(() => {
        this.#element.append(string[i]);
        i++;
        if (i > string.length) {
          clearInterval(intervel);
          resolve();
        }
      }, this.#typingSpeed);
    });
    return this;
  }

  deleteChars(number: number) {
    this.#addToQueue((resolve) => {
      //Add string to the screen
      let i = 0;
      const intervel = setInterval(() => {
        this.#element.innerText = this.#element.innerText.substring(
          0,
          this.#element.innerText.length - 1
        );
        i++;
        if (i > number) {
          clearInterval(intervel);
          resolve();
        }
      }, this.#deletingSpeed);
    });
    return this;
  }

  deleteAll(deletespeed = this.#deletingSpeed) {
    this.#addToQueue((resolve) => {
      //Add string to the screen

      const intervel = setInterval(() => {
        this.#element.innerText = this.#element.innerText.substring(
          0,
          this.#element.innerText.length - 1
        );
        if (this.#element.innerText.length === 0) {
          clearInterval(intervel);
          resolve();
        }
      }, deletespeed);
    });
    return this;
  }

  pauseFor(duration: number) {
    this.#addToQueue((resolve) => {
      //Add string to the screen

      setTimeout(() => resolve(), duration);
    });
    return this;
  }

  async start() {
    let cb = this.#queue.shift();
    while (cb != null) {
      await cb();
      if (this.#loop) this.#queue.push(cb);
      cb = this.#queue.shift();
    }

    return this;
  }
  #addToQueue(cb: (resolve: () => void) => void) {
    this.#queue.push(() => new Promise(cb));
  }
}
