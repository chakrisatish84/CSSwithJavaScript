import { snake_body_position } from "./snake_body_position.js";
let inputDirection = new snake_body_position(0, 0);
let lastInputDirection = new snake_body_position(0, 0);
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            if (lastInputDirection.yPosition !== 0)
                break;
            inputDirection = new snake_body_position(0, -1);
            break;
        case "ArrowDown":
            if (lastInputDirection.yPosition !== 0)
                break;
            inputDirection = new snake_body_position(0, 1);
            break;
        case "ArrowLeft":
            if (lastInputDirection.xPosition !== 0)
                break;
            inputDirection = new snake_body_position(-1, 0);
            break;
        case "ArrowRight":
            if (lastInputDirection.xPosition !== 0)
                break;
            inputDirection = new snake_body_position(1, 0);
            break;
    }
});
export function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
}
