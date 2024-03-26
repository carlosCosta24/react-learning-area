import { useState } from 'react'

function Square({ value, onSquareClick }) {

  return (<button className="square" onClick={onSquareClick}>
    {value}
  </button>)

}
function Board({ xIsNext, squares, onPlay }) {

  function handelClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return
    }

    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = 'O'
    }
    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares)
  let status;

  if (winner) {

    status = 'Winner:' + winner

  } else {

    status = 'Next player:' + (xIsNext ? 'X' : 'O')
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handelClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handelClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handelClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handelClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handelClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handelClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handelClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handelClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handelClick(8)} />
      </div>
    </>
  )
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let n = 0; n < lines.length; n++) {
    const [a, b, c] = lines[n]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null

}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumper(nextMove) {
    setCurrentMove(nextMove)
  }

  const moves = history.map((squares, move) => {
    let description
    if (move > 0) {
      description = 'go to move #' + move
    } else {
      description = 'go to game start'
    }
    return (
      <li key={move}>
        <button onClick={() => jumper(move)}>{description}</button>
      </li>
    )
  })
  return (
    <div className='game'>
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  )
}

/** For the current move only, show “You are at move #…” instead of a button.
Rewrite Board to use two loops to make the squares instead of hardcoding them.
Add a toggle button that lets you sort the moves in either ascending or descending order.
When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
Display the location for each move in the format (row, col) in the move history list.*/