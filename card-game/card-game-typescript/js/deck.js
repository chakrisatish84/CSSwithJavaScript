var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Card_value, _Card_suit;
var suits = ["♠", "♥", "♦", "♣"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
export default class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards;
    }
}
class Card {
    constructor(value, suit) {
        _Card_value.set(this, void 0);
        _Card_suit.set(this, void 0);
        __classPrivateFieldSet(this, _Card_value, value, "f");
        __classPrivateFieldSet(this, _Card_suit, suit, "f");
    }
}
_Card_value = new WeakMap(), _Card_suit = new WeakMap();
const freshDeck = () => {
    return suits.flatMap((suit) => {
        return values.map((value) => {
            return new Card(value, suit);
        });
    });
};
