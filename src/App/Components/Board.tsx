export enum Player {
    Cross = "cross",
    Circle = "circle"
}

export class MoveAlreadyPlayedError extends Error {}
export class WrongPlayerTurnError extends Error {}
export class FullBoardError extends Error {}

type Cell = Player | undefined
export default class Board {
    private lastPlayer?: Player
    private cells: Array<Cell> = [...Array(9)]

    move(cellIndex: number, player: Player): void {
        if (cellIndex > 8 || cellIndex < 0) {
            throw new RangeError(`Given index ${cellIndex} is out of range`)
        }

        if (this.lastPlayer === player) {
            throw new WrongPlayerTurnError()
        }

        if (this.isFullBoard) {
            throw new FullBoardError()
        }

        if (!this.isEmpty(cellIndex)) {
            throw new MoveAlreadyPlayedError(
                `Cell ${cellIndex} have already played`
            )
        }

        this.lastPlayer = player
        this.cells[cellIndex] = player
    }

    public isEmpty(cellIndex: number): boolean {
        return !this.cells[cellIndex]
    }

    private get isFullBoard() {
        return this.emptyCells.length === 0
    }

    get emptyCells(): Array<number> {
        return this.cells.reduce<Array<number>>((acc, _, index) => {
            if (this.isEmpty(index)) {
                acc.push(index)
            }

            return acc
        }, [])
    }

    get winner(): Player | null {
        if (this.emptyCells.length === this.cells.length) {
            return null
        }

        return Player.Cross
    }

    private get lines(): Array<Array<Cell>> {
        return [
            this.cells.slice(0, 3),
            this.cells.slice(3, 6),
            this.cells.slice(6)
        ]
    }
}
