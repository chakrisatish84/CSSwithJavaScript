import Deck from "./deck.js";
const playerDeckElement = document.querySelector(".player-deck");
const computerDeckElement = document.querySelector(".computer-deck");
const computerDeckSlot = document.querySelector(".computer-deck-slot");
const playerDeckSlot = document.querySelector(".player-deck-slot");
const text = document.querySelector(".text");
var deck = new Deck();
deck.shuffleCards();
let computerDeck, playerDeck, inRound, stop;
const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
};
document.addEventListener("click", () => {
    if (stop) {
        startGame();
    }
    if (inRound) {
        cleanBeforeRound();
    }
    else {
        flipCards();
    }
});
startGame();
function startGame() {
    const midPoint = Math.floor(deck.numberOfCards / 2);
    computerDeck = new Deck(deck.cards.slice(0, midPoint));
    playerDeck = new Deck(deck.cards.slice(midPoint));
    //Cleanup the cards
    cleanBeforeRound();
}
function cleanBeforeRound() {
    inRound = false;
    if (computerDeckSlot)
        computerDeckSlot.innerHTML = "";
    if (playerDeckSlot)
        playerDeckSlot.innerHTML = "";
    if (text)
        text.innerText = "";
    updateDeckCount();
}
const flipCards = () => {
    inRound = true;
    const computerCard = computerDeck.pop();
    const playerCard = playerDeck.pop();
    if (computerCard) {
        computerDeckSlot === null || computerDeckSlot === void 0 ? void 0 : computerDeckSlot.appendChild(computerCard === null || computerCard === void 0 ? void 0 : computerCard.generateHtml());
    }
    if (playerCard) {
        playerDeckSlot === null || playerDeckSlot === void 0 ? void 0 : playerDeckSlot.appendChild(playerCard.generateHtml());
    }
    updateDeckCount();
    //Check round winner
    if (isRoundWinner(playerCard, computerCard)) {
        if (text) {
            text.innerText = "Win!!";
            playerDeck.push(playerCard);
            playerDeck.push(computerCard);
        }
    }
    else {
        if (text)
            text.innerText = "Lose!!";
        computerDeck.push(playerCard);
        computerDeck.push(computerCard);
    }
    if (isGameOver(playerDeck)) {
        if (text)
            text.innerText = "You Lose!!";
        stop = true;
    }
    else if (isGameOver(computerDeck)) {
        if (text)
            text.innerText = "You Won!!";
        stop = true;
    }
};
function updateDeckCount() {
    if (playerDeckElement)
        playerDeckElement.innerText = playerDeck.numberOfCards.toString();
    if (computerDeckElement)
        computerDeckElement.innerText = computerDeck.numberOfCards.toString();
}
function isRoundWinner(playerCard, computerCard) {
    if (playerCard && computerCard) {
        return (CARD_VALUE_MAP[playerCard.value] > CARD_VALUE_MAP[computerCard.value]);
    }
}
function isGameOver(deck) {
    return deck.numberOfCards === 0;
}
