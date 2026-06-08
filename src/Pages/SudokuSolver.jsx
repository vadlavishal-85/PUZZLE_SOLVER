import { useState } from 'react';
import { Play, AlertTriangle } from 'lucide-react';

const EMPTY_BOARD = Array.from({ length: 9 }, () => Array(9).fill(0));

function SudokuSolver() {
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [isSolving, setIsSolving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCellChange = (r, c, value) => {
    const num = value === '' ? 0 : parseInt(value);
    if (isNaN(num) || num < 0 || num > 9) return;

    const newBoard = board.map(row => [...row]);
    newBoard[r][c] = num;
    setBoard(newBoard);
  };

  const handleSolve = () => {
    setIsSolving(true);

    // placeholder only (no algorithm yet in skeleton)
    setTimeout(() => {
      setErrorMsg("Solver not connected yet.");
      setIsSolving(false);
    }, 500);
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">

      <h1 className="text-3xl font-bold text-accent mb-2">
        SUDOKU SOLVER USING (CSP)
      </h1>

      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Sudoku solver UI skeleton with 9x9 grid.
      </p>

      {/* learning center content added */}
      {errorMsg && (
        <div className="mb-4 p-3 bg-red-100 text-red-600 rounded flex items-center">
          <AlertTriangle className="mr-2" />
          {errorMsg}
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-9 gap-1 mb-6">
        {board.map((row, r) =>
          row.map((val, c) => (
            <input
              key={`${r}-${c}`}
              type="text"
              maxLength={1}
              value={val === 0 ? '' : val}
              onChange={(e) => handleCellChange(r, c, e.target.value)}
              className="w-10 h-10 text-center border"
              disabled={isSolving}
            />
          ))
        )}
      </div>

      {/* BUTTON */}
      <button
        onClick={handleSolve}
        disabled={isSolving}
        className="px-4 py-2 bg-accent text-white rounded flex items-center hover:opacity-90 transition"
      >
        <Play className="mr-2" />
        Solve
      </button>

    </div>
  );
}

export default SudokuSolver;