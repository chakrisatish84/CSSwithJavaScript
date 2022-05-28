import { randonGridPosition } from "./grid.js";
import { expandSnake, onSnake } from "./snake.js";
export const SNAKE_SPEED = 2;
const EXPANSION_RATE = 2;
export const getRandonFoodPosition = () => {
    let newFoodPostion = null;
    while (newFoodPostion == null || onSnake(newFoodPostion)) {
        newFoodPostion = randonGridPosition();
    }
    return newFoodPostion;
};
let food = getRandonFoodPosition();
export const update = () => {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE);
        food = getRandonFoodPosition();
    }
};
export const draw = (gameBoard) => {
    const foodElement = document.createElement("div");
    foodElement.classList.add("food");
    foodElement.style.gridRowStart = food.yPosition.toString();
    foodElement.style.gridColumnStart = food.xPosition.toString();
    gameBoard.appendChild(foodElement);
};
