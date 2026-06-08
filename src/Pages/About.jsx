import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6 text-primary">About Puzzle Solver Studio</h1>
      <p className="mb-4 text-slate-600 dark:text-slate-300">
        Puzzle Solver Studio is an educational React project focused on search algorithms, constraint satisfaction, and AI problem solving.
      </p>
      <p className="mb-8 text-slate-600 dark:text-slate-300">
        It features a maze solver, a Sudoku CSP solver interface, and learning materials to help students understand computational foundations.
      </p>
      <Link to="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
}

export default About;
