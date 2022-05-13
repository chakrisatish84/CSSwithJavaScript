import React, { useEffect } from "react";
import "./App.css";
import Deck, { Card } from "./utilities/deck";

const computerSlot: HTMLDivElement | null =
  document.querySelector(".computer-slot");
const playerSlot: HTMLDivElement | null =
  document.querySelector(".player-slot");
const computerDeckElement: HTMLDivElement | null =
  document.querySelector(".computer-deck");
const playerDeckElement: HTMLDivElement | null =
  document.querySelector(".player-deck");
const text: HTMLDivElement | null = document.querySelector(".text");

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
]);

let playerDeck: Deck, computerDeck: Deck, inRound: boolean, stop: boolean;
function App() {
  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    document.addEventListener("click", () => {
      if (stop) {
        startGame();
      }
      if (inRound) {
        cleanRound();
      } else {
        flipCards();
      }
    });
  });
  return (
    <>
      <div className="computer-deck deck"></div>
      <div className="computer-slot"></div>
      <div className="text">Hello</div>
      <div className="player-deck deck"></div>
      <div className="player-slot"></div>
    </>
  );
}

const startGame = () => {
  var deck = new Deck();
  deck.shuffleCards();

  const midPoint = Math.ceil(deck.numberOfCards / 2);
  playerDeck = new Deck(deck.cards.slice(0, midPoint));
  computerDeck = new Deck(deck.cards.slice(midPoint));

  updateCount(playerDeck, computerDeck);

  cleanRound();
};
function cleanRound() {
  inRound = false;
  if (computerSlot) {
    computerSlot.innerHTML = "";
  }
  if (playerSlot) {
    playerSlot.innerHTML = "";
  }
  if (text) {
    text.innerText = "";
  }

  updateCount(playerDeck, computerDeck);
}

function flipCards() {
  inRound = true;
  const playerCard = playerDeck.pop();
  const computerCard = computerDeck.pop();

  if (playerCard) {
    playerSlot?.appendChild(playerCard.generateHTML());
  }

  if (computerCard) {
    computerSlot?.appendChild(computerCard.generateHTML());
  }

  //Check round winner
  if (isRoundWinner(playerCard, computerCard)) {
    if (text) {
      text.innerText = "Win!!";
      if (playerCard) playerDeck.push(playerCard);

      if (computerCard) playerDeck.push(computerCard);
    }
  } else {
    if (text) text.innerText = "Lose!!";
    if (playerCard) computerDeck.push(playerCard);
    if (computerCard) computerDeck.push(computerCard);
  }

  if (isGameOver(playerDeck)) {
    if (text) {
      text.innerText = "You Lose!!";
      stop = true;
    }
  } else if (isGameOver(computerDeck)) {
    if (text) text.innerText = "You Won!!";
    stop = true;
  }
}

const isRoundWinner = (
  playerCard: Card | undefined,
  computerCard: Card | undefined
): boolean => {
  if (playerCard && computerCard && CARD_VALUE_MAP) {
    return (
      CARD_VALUE_MAP?.get(playerCard?.value)! >
      CARD_VALUE_MAP?.get(computerCard?.value)!
    );
  }

  return true;
};

function updateCount(playerDeck: Deck, computerDeck: Deck) {
  if (computerDeckElement && computerDeck)
    computerDeckElement.innerText = computerDeck.numberOfCards.toString();

  if (playerDeckElement && playerDeck)
    playerDeckElement.innerText = playerDeck.numberOfCards.toString();
}

function isGameOver(deck: Deck) {
  return deck.numberOfCards === 0;
}
export default App;
