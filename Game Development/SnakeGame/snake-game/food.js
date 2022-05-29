import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

let food = getRandomFoodPostion();
const EXPANSION_RATE = 5;

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPostion();
  }
}

export function draw(gameBoard) {
  const snakeElement = document.createElement("div");
  snakeElement.style.gridRowStart = food.y;
  snakeElement.style.gridColumnStart = food.x;
  snakeElement.classList.add("food");

  gameBoard.appendChild(snakeElement);
}

function getRandomFoodPostion() {
  let newFoddPositon;
  while (newFoddPositon == null || onSnake(newFoddPositon)) {
    newFoddPositon = randomGridPosition();
  }
  return newFoddPositon;
}
