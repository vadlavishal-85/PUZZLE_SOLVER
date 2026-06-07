import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import MazeSolver from './pages/MazeSolver';
import SudokuSolver from './pages/SudokuSolver';
import LearningCenter from './pages/LearningCenter';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maze" element={<MazeSolver />} />
        <Route path="/sudoku" element={<SudokuSolver />} />
        <Route path="/learn" element={<LearningCenter />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;