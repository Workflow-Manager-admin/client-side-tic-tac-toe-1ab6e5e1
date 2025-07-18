import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * Main App component for the Tic Tac Toe frontend.
 * Features:
 * - Two-player game board (X and O)
 * - Game reset functionality
 * - Display win/draw state and whose turn it is
 * - Responsive, centered, minimalistic light UI using provided color palette
 */
function App() {
  // Initial 3x3 board state
  const emptyBoard = Array(9).fill(null);

  // State definitions
  const [board, setBoard] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState('');
  const [gameOver, setGameOver] = useState(false);

  // --- Color variables based on requirements (for inline usage where needed) ---
  const COLOR_PRIMARY = '#007BFF';
  const COLOR_ACCENT = '#28A745';
  const COLOR_SECONDARY = '#343A40';

  // Calculate winner or draw
  function calculateWinner(squares) {
    const lines = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  // Side effect: update status message whenever board changes
  useEffect(() => {
    const winner = calculateWinner(board);

    if (winner) {
      setStatus(`Winner: ${winner}`);
      setGameOver(true);
    } else if (board.every(Boolean)) {
      setStatus("It's a Draw!");
      setGameOver(true);
    } else {
      setStatus(`Turn: ${xIsNext ? 'X' : 'O'}`);
      setGameOver(false);
    }
  }, [board, xIsNext]);

  // Handle click event on box
  function handleClick(idx) {
    if (gameOver || board[idx]) return;

    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  // Reset game to initial state
  function resetGame() {
    setBoard(emptyBoard);
    setXIsNext(true);
    setStatus('');
    setGameOver(false);
  }

  // UI Components
  const renderSquare = idx => (
    <button
      className="ttt-square"
      key={idx}
      onClick={() => handleClick(idx)}
      style={{
        color:
          board[idx] === 'X'
            ? COLOR_PRIMARY
            : board[idx] === 'O'
            ? COLOR_ACCENT
            : COLOR_SECONDARY,
        cursor: board[idx] || gameOver ? 'not-allowed' : 'pointer',
      }}
      aria-label={`cell ${idx + 1} ${board[idx] || ''}`}
      disabled={Boolean(board[idx]) || gameOver}
    >
      {board[idx]}
    </button>
  );

  return (
    <div className="ttt-app-bg">
      <div className="ttt-container">
        <h1 className="ttt-title">Tic Tac Toe</h1>
        <div
          className="ttt-status"
          style={{
            color:
              status.startsWith('Winner')
                ? COLOR_ACCENT
                : status.includes('Draw')
                ? COLOR_SECONDARY
                : COLOR_PRIMARY,
          }}
          data-testid="status-area"
        >
          {status}
        </div>
        <div className="ttt-board" role="grid">
          {/* 3x3 grid */}
          {Array.from({ length: 9 }).map((_, i) => renderSquare(i))}
        </div>
        <button
          className="ttt-reset-btn"
          onClick={resetGame}
          style={{
            backgroundColor: COLOR_SECONDARY,
            color: 'white',
            marginTop: '1.5rem',
          }}
          aria-label="Reset Game"
        >
          Reset Game
        </button>
        <footer className="ttt-footer">
          <span>
            <a
              href="https://reactjs.org/"
              className="ttt-link"
              style={{ color: COLOR_PRIMARY }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Built with React
            </a>
          </span>
        </footer>
      </div>
    </div>
  );
}

export default App;
