import React, { useState } from "react"

import logo from "./logo.svg"
import "./App.scss"

import Game from "./Components/Game"

function App() {
    const [gameStarted, setGameStarted] = useState(false)
    const startGame = () => setGameStarted(true)

    return (
        <React.Fragment>
            <header>
                <img src={logo} className='App-logo' alt='logo' />
                <h1>Tic Tac Toe</h1>
                <div></div>
            </header>
            {gameStarted ? (
                <Game />
            ) : (
                <button title='start-game' onClick={startGame}>
                    Start Playing
                </button>
            )}
            <footer>
                <a href='https://github.com/fred-si/tic_tac_toe_front'>
                    Source code
                </a>
            </footer>
        </React.Fragment>
    )
}

export default App
