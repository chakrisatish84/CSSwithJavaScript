import Deck, { Card } from "./deck.js";
import { isShorthandPropertyAssignment } from "./node_modules/typescript/lib/typescript.js";

const playerDeckElement: HTMLDivElement | null =
  document.querySelector(".player-deck");
const computerDeckElement: HTMLDivElement | null =
  document.querySelector(".computer-deck");
const computerDeckSlot: HTMLDivElement | null = document.querySelector(
  ".computer-deck-slot"
);
const playerDeckSlot: HTMLDivElement | null =
  document.querySelector(".player-deck-slot");
const text: HTMLDivElement | null = document.querySelector(".text");

var deck = new Deck();

deck.shuffleCards();

let computerDeck: Deck, playerDeck: Deck, inRound: boolean, stop: boolean;

const CARD_VALUE_MAP: Map<string, number> = new Map<string, number>([
  ["2", 2],
  ["3", 3],
  ["4", 4],
  ["5", 5],
  ["6", 6],
  ["7", 7],
  ["8", 8],
  ["9", 9],
  ["10", 10],
  ["J", 11],
  ["Q", 2],
  ["K", 2],
  ["A", 2],
  // "3": 3,
  // "4": 4,
  // "5": 5,
  // "6": 6,
  // "7": 7,
  // "8": 8,
  // "9": 9,
  // "10": 10,
  // J: 11,
  // Q: 12,
  // K: 13,
  // A: 14,
]);

document.addEventListener("click", () => {
  if (stop) {
    startGame();
  }
  if (inRound) {
    cleanBeforeRound();
  } else {
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
  if (computerDeckSlot) computerDeckSlot.innerHTML = "";
  if (playerDeckSlot) playerDeckSlot.innerHTML = "";
  if (text) text.innerText = "";
  updateDeckCount();
}

const flipCards = () => {
  inRound = true;
  const computerCard = computerDeck.pop();
  const playerCard = playerDeck.pop();
  if (computerCard) {
    computerDeckSlot?.appendChild(computerCard?.generateHtml());
  }
  if (playerCard) {
    playerDeckSlot?.appendChild(playerCard.generateHtml());
  }

  updateDeckCount();

  //Check round winner
  if (isRoundWinner(playerCard, computerCard)) {
    if (text) {
      text.innerText = "Win!!";
      playerDeck.push(playerCard);
      playerDeck.push(computerCard);
    }
  } else {
    if (text) text.innerText = "Lose!!";
    computerDeck.push(playerCard);
    computerDeck.push(computerCard);
  }

  if (isGameOver(playerDeck)) {
    if (text) text.innerText = "You Lose!!";
    stop = true;
  } else if (isGameOver(computerDeck)) {
    if (text) text.innerText = "You Won!!";
    stop = true;
  }
};

function updateDeckCount() {
  if (playerDeckElement)
    playerDeckElement.innerText = playerDeck.numberOfCards.toString();

  if (computerDeckElement)
    computerDeckElement.innerText = computerDeck.numberOfCards.toString();
}

function isRoundWinner(
  playerCard: Card | undefined,
  computerCard: Card | undefined
) {
  if (playerCard && computerCard) {
    if (CARD_VALUE_MAP) {
      return (
        CARD_VALUE_MAP.get(playerCard.value) >
        CARD_VALUE_MAP.get(computerCard.value)
      );
    }
  }
}
function isGameOver(deck: Deck) {
  return deck.numberOfCards === 0;
}
