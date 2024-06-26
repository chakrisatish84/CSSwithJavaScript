var suits: string[] = ["♠", "♥", "♦", "♣"];
var values: string[] = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

export default class Deck {
  cards: Card[];
  constructor(cards: Card[] = freshDeck()) {
    this.cards = cards;
  }

  get numberOfCards() {
    return this.cards.length;
  }

  pop() {
    return this.cards.shift();
  }

  push(card: Card) {
    return this.cards.push(card);
  }

  shuffleCards() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      let newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
}

export class Card {
  value: string;
  suit: string;
  constructor(value: string, suit: string) {
    this.value = value;
    this.suit = suit;
  }

  getColor() {
    return this.suit === "♠" || this.suit === "♣" ? "black" : "red";
  }

  generateHTML() {
    const cardElement: HTMLDivElement = document.createElement("div");
    cardElement.innerText = this.suit;
    cardElement.classList.add("card", this.getColor());
    cardElement.dataset.value = `${this.value} ${this.suit}`;

    return cardElement;
  }

  // <div className="card red" data-value={"♥ 9"}>
  // {"♥"}
  // </div>
}

function freshDeck(): Card[] {
  return suits.flatMap((suit: string) => {
    return values.map((value: string) => {
      return new Card(value, suit);
    });
  });
}
