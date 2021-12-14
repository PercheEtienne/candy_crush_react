import {useEffect, useState} from "react";
import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import purpleCandy from './images/purple-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'
import blank from './images/blank.png'
import ScoreBoard from "./components/ScoreBoard";
import LevelSelector from "./components/LevelSelector";
import Footer from "./components/Footer";


const candiesColors = [blueCandy, greenCandy, orangeCandy, purpleCandy, redCandy, yellowCandy, blank]


function App() {
    const [width,setWidth] = useState(8);
    const [gameBoard, setGameBoard] = useState([])
    const [candyBeingDragged, setCandyBeingDragged] = useState(null)
    const [candyBeingReplaced, setCandyBeingReplaced] = useState(null)
    const [currentScore, setCurrentScore] = useState(0)
    const [gameStarted, setGameStarted] = useState(false)

    const createGameBoard = () => {
        let randomColors = []
        for (let i = 0; i < width * width; i++) {
            randomColors.push(candiesColors[Math.floor(Math.random() * candiesColors.length)])
        }
        setGameBoard(randomColors)
    }

    const checkFor3inColumn = () => {
        let valid = false
        for (let i = 0; i < (width * width) - (2 * width); i++) {
            const conlumOf3 = [i, i + width, i + 2 * width]
            const currentColor = gameBoard[i]

            if (conlumOf3.every(i => gameBoard[i] === currentColor) && gameBoard[i] !== blank) {
                conlumOf3.forEach(i => gameBoard[i] = blank)
                valid = true
            }
        }
        if (valid && gameStarted) {
            setCurrentScore((score) => score + 3)
        }
        return valid
    }

    const checkFor4inColumn = () => {
        let valid = false;
        for (let i = 0; i < (width * width) - (2 * width); i++) {
            const conlumOf4 = [i, i + width, i + 2 * width, i + 3 * width]
            const currentColor = gameBoard[i]

            if (conlumOf4.every(i => gameBoard[i] === currentColor) && gameBoard[i] !== blank) {
                conlumOf4.forEach(i => gameBoard[i] = blank)
                valid = true
            }
        }
        if (valid && gameStarted) {
            setCurrentScore((score) => score + 4)
        }
        return valid
    }

    const checkFor3inRow = () => {
        let valid = false
        const notValidIndex = []
        for (let i = 0; i < (width * width); i++) {
            const rowOf3 = [i, i + 1, i + 2]
            const currentColor = gameBoard[i]
            for (let j = 1; j < (width * width); j++) {
                if (j === i * width - 1 || j === i * width - 2) {
                    notValidIndex.push(j)
                }
            }
            if (rowOf3.every(i => gameBoard[i] === currentColor) && !notValidIndex.includes(i) && gameBoard[i] !== blank) {
                rowOf3.forEach(i => gameBoard[i] = blank)
                valid = true
            }
        }
        if (valid && gameStarted) {
            setCurrentScore((score) => score + 3)
        }
        return valid
    }

    const checkFor4inRow = () => {
        let valid = false
        const notValidIndex = []
        for (let i = 0; i < (width * width); i++) {
            const rowOf4 = [i, i + 1, i + 2, i + 3]
            const currentColor = gameBoard[i]
            for (let j = 1; j < (width * width); j++) {
                if (j === i * width - 1 || j === i * width - 2 || j === i * width - 3) {
                    notValidIndex.push(j)
                }
            }
            if (rowOf4.every(i => gameBoard[i] === currentColor) && !notValidIndex.includes(i) && gameBoard[i] !== blank) {
                rowOf4.forEach(i => gameBoard[i] = blank)
                valid = true
            }
        }
        if (valid && gameStarted) {
            setCurrentScore((score) => score + 4)
        }
        return valid
    }

    const moveIntoSquareBelow = () => {

        const firstRow = []
        for (let i = 0; i <= width; i++) {
            firstRow.push(i)
        }

        for (let i = 0; i < width * width - width; i++) {
            if (firstRow.includes(i) && gameBoard[i] === blank) {
                let randomNum = Math.floor(Math.random() * candiesColors.length)
                gameBoard[i] = candiesColors[randomNum]
            }

            if (gameBoard[i + width] === blank) {
                gameBoard[i + width] = gameBoard[i]
                gameBoard[i] = blank
            }
        }

    }

    const dragStart = (e) => {
        setCandyBeingDragged(e.target)
        setGameStarted(() => true)
    }

    const dragDrop = (e) => {
        setCandyBeingReplaced(e.target)
        console.log(gameStarted)
    }


    const dragEnd = () => {
        const idCandyBeingDragged = parseInt(candyBeingDragged.getAttribute('data-id'))
        const idCandyBeingReplaced = parseInt(candyBeingReplaced.getAttribute('data-id'))

        if ((idCandyBeingReplaced === idCandyBeingDragged + 1
            || idCandyBeingReplaced === idCandyBeingDragged - 1
            || idCandyBeingReplaced === idCandyBeingDragged + width
            || idCandyBeingReplaced === idCandyBeingDragged - width)) {
            gameBoard[idCandyBeingReplaced] = candyBeingDragged.getAttribute('src')
            gameBoard[idCandyBeingDragged] = candyBeingReplaced.getAttribute('src')
        }

        const isC4 = checkFor4inColumn()
        const isR4 = checkFor4inRow()
        const isC3 = checkFor3inColumn()
        const isR3 = checkFor3inRow()

        if ((isC4 || isR4 || isC3 || isR3)) {
            setCandyBeingReplaced(null)
            setCandyBeingDragged(null)
        } else {
            console.log("Unauthorized drag")

            gameBoard[idCandyBeingReplaced] = candyBeingReplaced.getAttribute('src')
            gameBoard[idCandyBeingDragged] = candyBeingDragged.getAttribute('src')

        }
        console.log(currentScore)
    }
    //TODO : vérifier pour les extrèmes
    //TODO : plusieurs lignes ou colonnes en même temps

    useEffect(() => {
        createGameBoard()
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            checkFor4inRow()
            checkFor4inColumn()
            checkFor3inRow()
            checkFor3inColumn()
            moveIntoSquareBelow()
            setGameBoard([...gameBoard])
        }, 50)
        return () => clearInterval(timer)
    }, [checkFor4inRow, checkFor4inColumn, checkFor3inRow, checkFor3inColumn, moveIntoSquareBelow, gameBoard])

    return (<div id="container">
            <div className="app">
                <LevelSelector/>
                <ScoreBoard score={currentScore}/>
                <div className="game">
                    {gameBoard.map((candiesColors, index) => (
                        <img
                            key={index}
                            src={candiesColors}
                            alt={candiesColors}
                            style={{background: 'rgba(158, 158, 158, 0.7)', border: '1px solid black'}}
                            data-id={index}
                            draggable={true}
                            onDragStart={dragStart}
                            onDragOver={(event => event.preventDefault())}
                            onDragEnter={(event => event.preventDefault())}
                            onDragLeave={(event => event.preventDefault())}
                            onDrop={dragDrop}
                            onDragEnd={dragEnd}
                        />
                    ))}
                </div>
                <Footer/>
            </div>
        </div>
    );
}

export default App;
