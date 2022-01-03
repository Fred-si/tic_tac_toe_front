import Board, {
    Player,
    MoveAlreadyPlayedError,
    WrongPlayerTurnError,
    FullBoardError
} from "./Board"

const playMoves = (board: Board, cells: Array<number>, first: Player) => {
    let second = first === Player.Cross ? Player.Circle : Player.Cross

    for (let i = 0; i < cells.length; i++) {
        board.move(cells[i], i % 2 ? second : first)
    }
}
describe("Test move", () => {
    let board: Board
    beforeEach(() => {
        board = new Board()
    })

    it("should throw if cell index is greater than 9", () => {
        expect(() => board.move(9, Player.Cross)).toThrowError(RangeError)
    })

    it("should throw if cell index is less than 0", () => {
        expect(() => board.move(-1, Player.Cross)).toThrowError(RangeError)
    })

    it("should throw if try to move twice in the same cell", () => {
        board.move(0, Player.Cross)
        expect(() => board.move(0, Player.Circle)).toThrowError(
            MoveAlreadyPlayedError
        )
    })

    it("should throw error when same player play twice move", () => {
        board.move(0, Player.Cross)
        expect(() => board.move(1, Player.Cross)).toThrowError(
            WrongPlayerTurnError
        )
    })

    it("should return list of 8 empty cells after first move", () => {
        board.move(0, Player.Cross)
        expect(board.emptyCells).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
    })

    it("should return list of 7 empty cells after first move", () => {
        board.move(0, Player.Cross)
        board.move(5, Player.Circle)

        expect(board.emptyCells).toEqual([1, 2, 3, 4, 6, 7, 8])
    })

    it("should throw when board is full", () => {
        playMoves(board, [0, 1, 2, 4, 3, 6, 5, 8, 7], Player.Cross)

        expect(() => board.move(0, Player.Circle)).toThrowError(FullBoardError)
    })
})

describe("Test winner", () => {
    let board: Board
    beforeEach(() => {
        board = new Board()
    })

    it("should return null when board is empty", () => {
        expect(board.winner).toBe(null)
    })

    it("should return Player.Cross for win in lines", () => {
        const winner = Player.Cross
        playMoves(board, [0, 3, 1, 4, 2], winner)

        expect(board.winner).toBe(winner)
    })

    it("should return Player.Circle for win in lines", () => {
        const winner = Player.Circle
        playMoves(board, [0, 3, 1, 4, 2], winner)

        expect(board.winner).toBe(winner)
    })

    it.skip("should return false with full board and no winner", () => {
        playMoves(board, [0, 1, 2, 4, 3, 6, 5, 8, 7], Player.Cross)

        expect(board.winner).toBe(null)
    })
})
