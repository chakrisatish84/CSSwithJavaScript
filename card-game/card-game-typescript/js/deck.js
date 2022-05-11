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
        return card ? this.cards.push(card) : this.cards;
    }
    shuffleCards() {
        for (var i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1));
            const oldValue = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldValue;
        }
    }
}
export class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }
    getColor() {
        return this.suit === "♥" || this.suit === "♦" ? "red" : "black";
    }
    generateHtml() {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card", `${this.getColor()}`);
        cardElement.innerText = this.suit;
        cardElement.dataset.value = `${this.value} ${this.suit}`;
        return cardElement;
    }
}
const freshDeck = () => {
    return suits.flatMap((suit) => {
        return values.map((value) => {
            return new Card(value, suit);
        });
    });
};
