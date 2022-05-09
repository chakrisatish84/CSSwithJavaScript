var suits = ["♠", "♥", "♦", "♣"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export default class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards;
  }

  get numberOfCards() {
    return this.cards.length;
  }

  pop() {
    return this.cards.shift();
  }

  push(card) {
    return this.cards.push(card);
  }

  shuffleCards = () => {
    for (var i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  };
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  //   <div class="card red" data-value="9 ♥">
  // ♥
  // </div>

  get color() {
    return this.suit === "♠" || this.suit === "♣" ? "black" : "red";
  }

  getHtml() {
    const cardElement = document.createElement("div");
    cardElement.innerText = this.suit;
    cardElement.classList.add("card", this.color);
    cardElement.dataset.value = `${this.value} ${this.suit}`;
    return cardElement;
  }
}

const freshDeck = () => {
  return suits.flatMap((suit) => {
    return values.map((value) => {
      return new Card(suit, value);
    });
  });
};
