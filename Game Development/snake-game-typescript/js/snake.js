import { getInputDirection } from "./input.js";
import { snake_body_position } from "./snake_body_position.js";
export const SNAKE_SPEED = 2;
const snake_body = [new snake_body_position(10, 10)];
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
export const draw = (gameBoard) => {
    snake_body.forEach((segment) => {
        var _a, _b;
        const snakeElement = document.createElement("div");
        snakeElement.classList.add("snake");
        snakeElement.style.gridRowStart = (_a = segment.yPosition) === null || _a === void 0 ? void 0 : _a.toString();
        snakeElement.style.gridColumnStart = (_b = segment.xPosition) === null || _b === void 0 ? void 0 : _b.toString();
        gameBoard.appendChild(snakeElement);
    });
};
export const onSnake = (food, { ignoreHead = false } = {}) => {
    return snake_body.some((segment, index) => {
        if (ignoreHead && index === 0)
            return false;
        return equalPosition(segment, food);
    });
};
export const getSnakeHead = () => {
    return snake_body[0];
};
export const snakeIntersection = () => {
    return onSnake(snake_body[0], { ignoreHead: true });
};
export const equalPosition = (snakePositon, foodPosition) => {
    return (snakePositon.xPosition === foodPosition.xPosition &&
        snakePositon.yPosition === foodPosition.yPosition);
};
export const expandSnake = (amount) => {
    newSegments += amount;
};
export const addSegments = () => {
    for (let i = 0; i < newSegments; i++) {
        snake_body.push(Object.assign({}, snake_body[snake_body.length - 1]));
    }
    newSegments = 0;
};
