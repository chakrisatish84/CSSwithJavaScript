import { decodedTextSpanIntersectsWith } from "./node_modules/typescript/lib/typescript";
import {
  SNAKE_SPEED,
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersection,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";

let lastRenderTime: number;
let gameOver: boolean = false;
const gameBoard: HTMLDivElement = document.querySelector(
  "#game-board"
) as HTMLDivElement;

function main(currentTime: number) {
  if (gameOver) {
    if (confirm("You lost, Press ok to restart..")) {
      const win: Window = window;
      win.location = "/Game%20Development/snake-game-typescript/index.html";
    }
    return;
  }
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  window.requestAnimationFrame(main);
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  draw();
  update();
}

window.requestAnimationFrame(main);

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

export const checkDeath = () => {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
};
