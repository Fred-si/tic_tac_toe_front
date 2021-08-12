import { Fragment, useState } from "react"

import "./Game.scss"
import { Empty, Cross, Circle } from "./Forms"

interface Forms {
    cross: typeof Cross
    circle: typeof Circle
    empty: typeof Empty
}

const forms: Forms = {
    cross: Cross,
    circle: Circle,
    empty: Empty
}

type FormName = keyof Forms
type Cells = Array<FormName | undefined>

export default function Game() {
    const players: Array<FormName> = ["cross", "circle"]

    interface GameState {
        cells: Cells
        currentTurn: number
    }

    const initialState = { cells: [...Array(9)], currentTurn: 0 }
    const [state, setState] = useState<GameState>(initialState)
    const newGame = () => setState(initialState)

    const onClick = (cellID: number) => {
        const cells = [...state.cells]
        cells[cellID] = players[state.currentTurn % 2]
        setState({ cells, currentTurn: state.currentTurn + 1 })
    }

    return (
        <div className='game' title='game-board'>
            <h2>{players[state.currentTurn % 2]} turn</h2>
            <div className='game-grid'>
                <CellCollection cells={state.cells} onClick={onClick} />
            </div>
            <button onClick={newGame}>Reset</button>
        </div>
    )
}

interface CellCollectionProps {
    cells: Cells
    onClick: (id: number) => void
}
function CellCollection({ cells, onClick }: CellCollectionProps) {
    return (
        <Fragment>
            {cells.map((formName, cellID) => (
                <Cell
                    {...{ cellID, formName, onClick }}
                    key={cellID.toString()}
                />
            ))}
        </Fragment>
    )
}

interface CellProps {
    cellID: number
    formName?: FormName
    onClick: (cellID: number) => void
}
function Cell({ cellID, formName, onClick }: CellProps) {
    const SVG = forms[formName ?? "empty"]

    return <SVG onClick={formName ? () => {} : () => onClick(cellID)} />
}
