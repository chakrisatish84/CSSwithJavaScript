export interface IPosition {
    x: number,
    y: number,
}
export interface TileContent {
    position: IPosition
    element: HTMLDivElement,
    mine: boolean,
    getStatus: () => string,
    setStatus: (value: string) => void,
}

type Status_Type = {
    [key: string]: string
}

export const STATUS_VALUES: Status_Type = {
    HIDDEN: "hidden",
    MINE: "mine",
    NUMBER: "number",
    MARKED: "marked",
}


export const createBoard = (boradSize: number, numnerOfMines: number) => {
    const board: TileContent[][] = []
    const minePositions: IPosition[] = createMinePositions(boradSize, numnerOfMines);

    for (let x = 0; x < boradSize; x++) {
        const row: TileContent[] = []
        for (let y = 0; y < boradSize; y++) {
            const element = document.createElement('div');
            element.dataset.status = STATUS_VALUES.HIDDEN
            const tile: TileContent = {
                position: { x: x, y: y },
                element: element,
                mine: minePositions.some((p: IPosition) => { return positionMatch(p, { x: x, y: y }) }),
                getStatus(): string {
                    return this.element.dataset.status;
                },
                setStatus(value: string) {
                    this.element.dataset.status = value;
                }
            }
            row.push(tile)
        }
        board.push(row);
    }
    return board
}

export function makrTile(tile: TileContent) {
    if (tile.getStatus() !== STATUS_VALUES.HIDDEN && tile.getStatus() !== STATUS_VALUES.MARKED) {
        return
    }
    if (tile.getStatus() === STATUS_VALUES.HIDDEN) {
        tile.setStatus(STATUS_VALUES.MARKED)
    }
    else {
        tile.setStatus(STATUS_VALUES.HIDDEN)
    }
}

function createMinePositions(boradSize: number, numnerOfMines: number) {
    const positions: IPosition[] = [];

    while (numnerOfMines > positions.length) {
        const position: IPosition = {
            x: randomNumber(boradSize),
            y: randomNumber(boradSize)
        }

        if (!positions.some((p) => { return positionMatch(p, position) })) {
            positions.push(position)
        }
    }
    return positions;
}

const randomNumber = (boradSize: number): number => {
    return Math.floor(Math.random() * boradSize)
}

const positionMatch = (p: IPosition, position: IPosition): boolean => {
    return p.x == position.x && p.y === position.y
}

export const revealTile = (board: TileContent[][], tile: TileContent) => {
    if (tile.getStatus() !== STATUS_VALUES.HIDDEN) {
        return
    }

    if (tile.mine) {
        tile.setStatus(STATUS_VALUES.MINE);
        return
    }
    tile.setStatus(STATUS_VALUES.NUMBER);
    const adjacentTiles = nearbyTiles(board, tile);
    const mineCount = adjacentTiles.filter((tile: TileContent) => { return tile.mine }).length;
    if (mineCount === 0) {
        adjacentTiles.forEach(revealTile.bind(null, board));
    }
    else {
        tile.element.textContent = mineCount.toString();
    }

}

const nearbyTiles = (board: TileContent[][], { position }: TileContent): TileContent[] => {
    const { x, y } = position
    const tiles: TileContent[] = []
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const tile = board[x + i]?.[y + j]
            if (tile) {
                tiles.push(tile)
            }
        }
    }
    return tiles;
}

export const checkWin = (board: TileContent[][]): boolean => {
    return board.every((row: TileContent[]) => {
        return row.every((tile: TileContent) => {
            return (
                tile.getStatus() === STATUS_VALUES.NUMBER || (tile.mine && (tile.getStatus() === STATUS_VALUES.HIDDEN || tile.getStatus() === STATUS_VALUES.MARKED))
            )
        })
    })
}

export const checkLose = (board: TileContent[][]): boolean => {
    return board.some((row: TileContent[]) => {
        return row.some((tile: TileContent) => {
            return tile.getStatus() === STATUS_VALUES.MINE
        })
    })
}

