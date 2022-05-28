import { snake_body_position } from "./snake_body_position.js";
const GRID_SZIE = 21;

export const randonGridPosition = (): snake_body_position => {
  return new snake_body_position(getRandomNumber(), getRandomNumber());
};

const getRandomNumber = () => {
  return Math.floor(Math.random() * GRID_SZIE) + 1;
};

export const outsideGrid = (positon: snake_body_position) => {
  return (
    positon.xPosition < 1 ||
    positon.xPosition > GRID_SZIE ||
    positon.yPosition < 1 ||
    positon.yPosition > GRID_SZIE
  );
};
