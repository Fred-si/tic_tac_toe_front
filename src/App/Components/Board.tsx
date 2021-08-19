export enum Player {
    Cross,
    Circle
}

type Cell = Player | undefined

export default class Board {
    cells: Array<Cell>

    constructor() {
        this.cells = Array(9)
    }
    move(cellIndex: number, player: Player): void {
        throw new RangeError(`Given index ${cellIndex} is out of range`)
    }
}
