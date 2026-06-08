import { useState } from 'react';
import { Play, RefreshCw } from 'lucide-react';

const ROWS = 15;
const COLS = 20;

const createEmptyGrid = () =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(0));

function MazeSolver() {
  const [grid] = useState(createEmptyGrid());
  const [algorithm, setAlgorithm] = useState('bfs');
// maze solver visualization UI added
  return (
    <div className="max-w-6xl mx-auto pb-12">

      <h1 className="text-3xl font-bold mb-4">Maze Solver</h1>

      {/* Simple Controls */}
      <div className="mb-4 space-x-2">
        <button className="btn-primary">Draw Mode</button>
        <button className="btn-secondary">Clear</button>
        <button className="btn-accent">
          <RefreshCw className="w-4 h-4" /> Random Maze
        </button>
      </div>

      {/* Algorithm Selector */}
      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        className="p-2 border rounded mb-4"
      >
        <option value="bfs">BFS</option>
        <option value="dfs">DFS</option>
        <option value="ucs">UCS</option>
        <option value="greedy">Greedy</option>
      </select>

      {/* Grid (NO logic) */}
      <div
        className="grid gap-[2px] bg-gray-300 p-2"
        style={{ gridTemplateColumns: `repeat(${COLS}, 20px)` }}
      >
        {grid.map((row, r) =>
          row.map((_, c) => (
            <div
              key={`${r}-${c}`}
              className="w-5 h-5 bg-white border"
            />
          ))
        )}
      </div>

      {/* Solve Button */}
      <button className="btn-primary mt-4 flex items-center">
        <Play className="mr-2" />
        Find Path
      </button>

    </div>
  );
}

export default MazeSolver;