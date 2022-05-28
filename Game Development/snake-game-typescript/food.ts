import { randonGridPosition } from "./grid.js";
import { expandSnake, onSnake } from "./snake.js";
import { snake_body_position } from "./snake_body_position.js";

export const SNAKE_SPEED: number = 2;
const EXPANSION_RATE = 2;

export const getRandonFoodPosition = () => {
  let newFoodPostion: snake_body_position | null = null;
  while (newFoodPostion == null || onSnake(newFoodPostion)) {
    newFoodPostion = randonGridPosition();
  }
  return newFoodPostion;
};

let food: snake_body_position = getRandonFoodPosition();

export const update = () => {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandonFoodPosition();
  }
};

export const draw = (gameBoard: HTMLDivElement) => {
  const foodElement = document.createElement("div");
  foodElement.classList.add("food");
  foodElement.style.gridRowStart = food.yPosition.toString();
  foodElement.style.gridColumnStart = food.xPosition.toString();
  gameBoard.appendChild(foodElement);
};


