import {
  SNAKE_SPEED,
  update as updateSnake,
  draw as drawSnake,
  getShankeHead,
  snakeIntersection,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outSideGrid } from "./grid.js";

let lastRednerTime = 0;
let gameOver = false;
const gameBaord = document.querySelector(".game-board");

function main(currentTime) {
  if (gameOver) {
    if (confirm("You Lost. Press ok to restart")) {
      window.location = "/Game%20Development/snake-game/";
    }
    return;
  }
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRednerTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRednerTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBaord.innerHTML = "";
  drawSnake(gameBaord);
  drawFood(gameBaord);
}

function checkDeath() {
  gameOver = outSideGrid(getShankeHead()) || snakeIntersection();
}
