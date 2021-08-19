import Board, { Player } from "./Board"

let board: Board
beforeEach(() => {
    board = new Board()
})

describe("Test constructor", () => {
    it("should have property named cells", () => {
        expect(board).toHaveProperty("cells")
    })

    it("should create 9 cells", () => {
        expect(board.cells).toHaveLength(9)
    })

    it("should initialize all cells to undifined", () => {
        expect(board.cells.every(e => e === undefined)).toBeTruthy()
    })
})

describe("Test move", () => {
    beforeEach(() => {
        board = new Board()
    })

    it("should throw if cell index is greater than 9", () => {
        expect(() => board.move(9, Player.Cross)).toThrowError(RangeError)
    })

    it.todo("should insert player on first cell")
})
