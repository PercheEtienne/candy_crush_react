import {useEffect, useState} from "react";
import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import purpleCandy from './images/purple-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'
import blank from './images/blank.png'

const width = 8;
const candiesColors = [blueCandy, greenCandy, orangeCandy, purpleCandy, redCandy, yellowCandy, blank]


function App() {

    const [gameBoard, setGameBoard] = useState([])
    const [nextGameBoard, setNextGameBoard] = useState([])
    const [candyBeingDragged, setCandyBeingDragged] = useState(null)
    const [candyBeingReplaced, setCandyBeingReplaced] = useState(null)
    let [currentScore, setCurrentScore] = useState(0)

    const createGameBoard = () => {
        let randomColors = []
        for (let i = 0; i < width * width; i++) {
            randomColors.push(candiesColors[Math.floor(Math.random() * candiesColors.length)])
        }
        setGameBoard(randomColors)
        setNextGameBoard(randomColors)
    }

    const checkFor3inColumn = () => {
        for (let i = 0; i < (width * width) - (2 * width); i++) {
            const conlumOf3 = [i, i + width, i + 2 * width]
            const currentColor = gameBoard[i]

            if (conlumOf3.every(i => gameBoard[i] === currentColor)) {
                conlumOf3.forEach(i => gameBoard[i] = blank)
                return true
            }
        }
    }

    const checkFor4inColumn = () => {
        for (let i = 0; i < (width * width) - (2 * width); i++) {
            const conlumOf4 = [i, i + width, i + 2 * width, i + 3 * width]
            const currentColor = gameBoard[i]

            if (conlumOf4.every(i => gameBoard[i] === currentColor)) {
                conlumOf4.forEach(i => gameBoard[i] = blank)
                return true
            }
        }
    }

    const checkFor3inRow = () => {
        const notValidIndex = []
        for (let i = 0; i < (width * width); i++) {
            const rowOf3 = [i, i + 1, i + 2]
            const currentColor = gameBoard[i]
            for (let j = 1; j < (width * width); j++) {
                if (j === i * width - 1 || j === i * width - 2) {
                    notValidIndex.push(j)
                }
            }
            if (rowOf3.every(i => gameBoard[i] === currentColor) && !notValidIndex.includes(i)) {
                rowOf3.forEach(i => gameBoard[i] = blank)
                return true
            }
        }
    }

    const checkFor4inRow = () => {
        const notValidIndex = []
        for (let i = 0; i < (width * width); i++) {
            const rowOf4 = [i, i + 1, i + 2, i + 3]
            const currentColor = gameBoard[i]
            for (let j = 1; j < (width * width); j++) {
                if (j === i * width - 1 || j === i * width - 2 || j === i * width - 3) {
                    notValidIndex.push(j)
                }
            }
            if (rowOf4.every(i => gameBoard[i] === currentColor) && !notValidIndex.includes(i)) {
                rowOf4.forEach(i => gameBoard[i] = blank)
                return true
            }
        }
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
        //console.log(e.target)
        console.log("drag start")
        setCandyBeingDragged(e.target)
    }

    const dragDrop = (e) => {
        //console.log(e.target)
        console.log("drag drop")
        setCandyBeingReplaced(e.target)
    }


    const dragEnd = (e) => {
        //console.log(e.target)
        console.log("drag end")
        const idCandyBeingDragged = parseInt(candyBeingDragged.getAttribute('data-id'))
        const idCandyBeingReplaced = parseInt(candyBeingReplaced.getAttribute('data-id'))

        gameBoard[idCandyBeingReplaced] = candyBeingDragged.getAttribute('src')
        gameBoard[idCandyBeingDragged] = candyBeingReplaced.getAttribute('src')

        if ((idCandyBeingReplaced === idCandyBeingDragged + 1
                || idCandyBeingReplaced === idCandyBeingDragged - 1
                || idCandyBeingReplaced === idCandyBeingDragged + width
                || idCandyBeingReplaced === idCandyBeingDragged - width)
            && (checkFor4inColumn() || checkFor3inColumn() || checkFor4inRow() || checkFor3inRow())
        ) {
            console.log("Unauthorized drag")
            setCandyBeingReplaced(null)
            setCandyBeingDragged(null)
        } else {
            gameBoard[idCandyBeingReplaced] = candyBeingReplaced.getAttribute('src')
            gameBoard[idCandyBeingDragged] = candyBeingDragged.getAttribute('src')
        }
        //console.log(currentScore)
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
        }, 100)
        return () => clearInterval(timer)
    }, [checkFor4inRow, checkFor4inColumn, checkFor3inRow, , checkFor3inColumn, moveIntoSquareBelow, gameBoard])

    return (
        <div className="app">
            <div className="game">
                {gameBoard.map((candiesColors, index) => (
                    <img
                        key={index}
                        src={candiesColors}
                        alt={candiesColors}
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
        </div>
    );
}

export default App;
