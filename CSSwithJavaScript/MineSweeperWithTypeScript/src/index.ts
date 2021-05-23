import { checkWin, checkLose, createBoard, makrTile, revealTile, TileContent, STATUS_VALUES } from './mineSweeper'

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 5;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);

const boardElement: HTMLDivElement = document.querySelector(".board");
const minesCountText: HTMLSpanElement = document.querySelector("[data-mines-count]")
const subTextElement: HTMLDivElement = document.querySelector('.subtext')


if (boardElement) {
    board.forEach((row: TileContent[]) => {
        row.forEach((tile: TileContent) => {
            if (tile) {
                boardElement.append(tile?.element)
                if (tile.element) {
                    tile.element.addEventListener('click', () => {
                        revealTile(board, tile);
                        checkGameEnd();
                    })
                    tile.element.addEventListener('contextmenu', (e: MouseEvent) => {
                        e.preventDefault()
                        makrTile(tile);
                        updateMinesCount();
                    })
                }
            }
        })
    })
}

boardElement.style.setProperty("--size", BOARD_SIZE.toString())
minesCountText.textContent = NUMBER_OF_MINES.toString()


const updateMinesCount = () => {
    const selectedminesCount = board.reduce((count: number, row: TileContent[]) => { return count + row.filter((tile: TileContent) => { return tile.getStatus() === STATUS_VALUES.MARKED }).length }, 0);
    minesCountText.textContent = (NUMBER_OF_MINES - selectedminesCount).toString()
}

function checkGameEnd() {
    const isWin = checkWin(board)
    const isLose = checkLose(board)

    if (isWin || isLose) {
        boardElement.addEventListener('click', stopProp, { capture: true })
        boardElement.addEventListener('contextmenu', stopProp, { capture: true })
    }

    if (isWin) {
        subTextElement.textContent = "You Won"
    }

    if (isLose) {
        subTextElement.textContent = "You Lose"
        board.forEach((row: TileContent[]) => {
            row.forEach((tile: TileContent) => {
                if (tile.getStatus() === STATUS_VALUES.MARKED) makrTile(tile);
                if (tile.mine) {
                    revealTile(board, tile)
                }
            })
        })
    }
}



const stopProp = (e: MouseEvent | KeyboardEvent) => {
    e.stopImmediatePropagation();
}

