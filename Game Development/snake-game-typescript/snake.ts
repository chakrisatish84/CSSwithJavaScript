import { getInputDirection } from "./input.js";
import { snake_body_position } from "./snake_body_position.js";

export const SNAKE_SPEED: number = 2;

const snake_body: snake_body_position[] = [new snake_body_position(10, 10)];
let newSegments = 0;

export const update = () => {
  addSegments();
  const inputDirection = getInputDirection();
  for (let i = snake_body.length - 2; i >= 0; i--) {
    snake_body[i + 1].xPosition = snake_body[i].xPosition;
    snake_body[i + 1].yPosition = snake_body[i].yPosition;
  }

  snake_body[0].xPosition += inputDirection.xPosition;
  snake_body[0].yPosition += inputDirection.yPosition;
};

export const draw = (gameBoard: HTMLDivElement) => {
  snake_body.forEach((segment: snake_body_position) => {
    const snakeElement = document.createElement("div");
    snakeElement.classList.add("snake");
    snakeElement.style.gridRowStart = segment.yPosition?.toString();
    snakeElement.style.gridColumnStart = segment.xPosition?.toString();
    gameBoard.appendChild(snakeElement);
  });
};

export const onSnake = (
  food: snake_body_position,
  { ignoreHead = false } = {}
): boolean => {
  return snake_body.some((segment: snake_body_position, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPosition(segment, food);
  });
};

export const getSnakeHead = () => {
  return snake_body[0];
};

export const snakeIntersection = () => {
  return onSnake(snake_body[0], { ignoreHead: true });
};

export const equalPosition = (
  snakePositon: snake_body_position,
  foodPosition: snake_body_position
) => {
  return (
    snakePositon.xPosition === foodPosition.xPosition &&
    snakePositon.yPosition === foodPosition.yPosition
  );
};

export const expandSnake = (amount: number) => {
  newSegments += amount;
};

export const addSegments = () => {
  for (let i = 0; i < newSegments; i++) {
    snake_body.push({
      ...snake_body[snake_body.length - 1],
    } as snake_body_position);
  }
  newSegments = 0;
};
