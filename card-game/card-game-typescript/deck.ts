var suits = ["♠", "♥", "♦", "♣"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export default class Deck {
  cards: Card[];
  constructor(cards: Card[] = freshDeck()) {
      this.cards = cards;
  }
}

class Card {
  #value: string;
  #suit: string;
  constructor(value: string, suit: string) {
    this.#value = value;
    this.#suit = suit;
  }
}

const freshDeck = (): Card[] => {
  return suits.flatMap((suit: string) => {
    return values.map((value: string) => {
      return new Card(value, suit);
    });
  });
};
