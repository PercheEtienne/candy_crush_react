import {useEffect, useState} from "react";

const width = 8;
const candiesColors = ['blue','green','orange','purple','red','yellow']


function App() {

  const [gameBoard,setGameBoard] = useState([])

  const createGameBoard = () => {
    let randomColors = []
    for (let i = 0; i<width*width ; i++){
      randomColors.push(candiesColors[Math.floor(Math.random() * candiesColors.length)])
    }
    setGameBoard(randomColors);
  }

  const checkFor3inColumn = () => {
    for (let i = 0; i<(width*width)-(2*width) ; i++){
      const conlumOf3 = [i,i+width,i+2*width]
      const currentColor = gameBoard[i]

      if (conlumOf3.every(i => gameBoard[i] === currentColor)){
        conlumOf3.forEach(i => gameBoard[i] = '')
      }
    }
  }

  const checkFor4inColumn = () => {
    for (let i = 0; i<(width*width)-(2*width) ; i++){
      const conlumOf4 = [i,i+width,i+2*width,i+3*width]
      const currentColor = gameBoard[i]

      if (conlumOf4.every(i => gameBoard[i] === currentColor)){
        conlumOf4.forEach(i => gameBoard[i] = '')
      }
    }
  }

  const checkFor3inRow = () => {
    const notValidIndex = []
    for (let i = 0; i<(width*width)-(2*width) ; i++){
      const rowOf3 = [i,i+1,i+2]
      const currentColor = gameBoard[i]
      for (let j = 1;j<(width*width);j++){
        if (j === i*width-1 || j === i*width-2){
          notValidIndex.push(j)
        }
      }
      if (rowOf3.every(i => gameBoard[i] === currentColor) && !notValidIndex.includes(i)){

        rowOf3.forEach(i => gameBoard[i] = '')
      }
    }
  }

  const checkFor4inRow = () => {
    const notValidIndex = []
    for (let i = 0; i<(width*width)-(2*width) ; i++){
      const rowOf4 = [i,i+1,i+2,i+3]
      const currentColor = gameBoard[i]
      for (let j = 1;j<(width*width);j++){
        if (j === i*width-1 || j === i*width-2 || j === i*width-3){
          notValidIndex.push(j)
        }
      }
      if (rowOf4.every(i => gameBoard[i] === currentColor) && !notValidIndex.includes(i)){
        rowOf4.forEach(i => gameBoard[i] = '')
      }
    }
  }
  
  const moveIntoSquareBelow = () => {

    const firstRow = []
    for (let i=0;i<=width;i++){
      firstRow.push(i)
    }

    for(let i = 0; i<width*width-width ; i++){
      if (firstRow.includes(i) && gameBoard[i] === ''){
        let randomNum = Math.floor(Math.random() * candiesColors.length)
        gameBoard[i] = candiesColors[randomNum]
      }

      if (gameBoard[i+width] === ''){
        gameBoard[i+width] = gameBoard[i]
        gameBoard[i] = ''
      }
    }
    
  }

  useEffect(() => {
    createGameBoard()
      }
  ,[])

  //console.log(gameBoard)

  useEffect(() => {
        const timer = setInterval( () => {
          checkFor4inRow()
          checkFor4inColumn()
          checkFor3inRow()
          checkFor3inColumn()
          moveIntoSquareBelow()
          setGameBoard([...gameBoard])
    },500)
       return () => clearInterval(timer)
      },[checkFor4inRow,checkFor4inColumn,checkFor3inRow,,checkFor3inColumn,moveIntoSquareBelow,gameBoard])

  return (
    <div className="app" >
      <div className="game">
        {gameBoard.map((candiesColors,index) => (
            <img
              key={index}
              style={{backgroundColor: candiesColors}}
              alt={candiesColors}

            />
          ))}
      </div>
    </div>
  );
}

export default App;
