import { render, screen } from "@testing-library/react"
import App from "./App"
import userEvent from "@testing-library/user-event"

it("should display logo and start button", () => {
    render(<App />)
    expect(screen.getByAltText(/logo/)).toBeInTheDocument()
    expect(screen.getByTitle(/start-game/)).toBeInTheDocument()

    expect(screen.queryByRole(/game-board/)).not.toBeInTheDocument()
})

it("should display page title", () => {
    render(<App />)
    expect(screen.getByRole(/heading/)).toBeInTheDocument()
})

it("should display Game component when start button is clicked", () => {
    render(<App />)
    userEvent.click(screen.getByTitle(/start-game/))

    expect(screen.queryByTitle(/start-game/)).not.toBeInTheDocument()

    expect(screen.getByTitle(/game-board/)).toBeInTheDocument()
})
