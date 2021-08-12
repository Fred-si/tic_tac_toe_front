import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import Game from "./Game"

const gridSelector = "h2 + div"
const emptyCellsSelector = `${gridSelector} svg[aria-label=empty]`
const fullCellsSelector = `${gridSelector} svg:not([aria-label=empty])`

let container: HTMLElement
beforeEach(() => {
    container = render(<Game />).container
})

it("should display current turn", () => {
    expect(screen.getByText(/\w+ turn/i)).toBeInTheDocument()
})

it("should display game grid", () => {
    expect(container.querySelector(gridSelector)).toBeInTheDocument()
})

test("game grid should contain 9 cells at first render", () => {
    expect(container.querySelectorAll(emptyCellsSelector)).toHaveLength(9)
})

test("click on empty cell should change displayed player name", () => {
    const header = screen.getByRole(/heading/)
    const grid = container.querySelector(gridSelector) as HTMLElement
    let textBeforeClick

    textBeforeClick = header.textContent
    userEvent.click(grid.children[0] as HTMLElement)
    expect(header.textContent).not.toBe(textBeforeClick)

    textBeforeClick = header.textContent
    userEvent.click(grid.children[0] as HTMLElement)
    expect(header.textContent).toBe(textBeforeClick)
})

test("game grid should not contain form before click", () => {
    expect(container.querySelectorAll(fullCellsSelector)).toHaveLength(0)
})

test("click on cell should display form in cell", () => {
    const grid = container.querySelector(gridSelector) as HTMLElement
    const getLabel = () => grid?.firstElementChild?.getAttribute("aria-label")

    expect(getLabel()).toBe("empty")
    userEvent.click(grid.firstElementChild as HTMLElement)
    expect(getLabel()).not.toBe("empty")
})

test("cells contain forms after click", () => {
    const grid = container.querySelector(gridSelector) as HTMLElement
    const getChildrenLabel = (childIndex: number) =>
        grid.children[childIndex]?.getAttribute("aria-label")

    for (let i = 0; i < 9; i++) {
        expect(getChildrenLabel(i)).toBe("empty")

        userEvent.click(grid.children[i])
        expect(getChildrenLabel(i)).not.toBe("empty")
    }
})

test("reset button should reset game", () => {
    const cells = container.querySelectorAll(emptyCellsSelector)
    cells.forEach(cell => userEvent.click(cell))

    userEvent.click(screen.getByRole(/button/))
    expect(container.querySelectorAll(emptyCellsSelector)).toHaveLength(9)
})
