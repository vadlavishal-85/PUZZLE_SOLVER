import { GraduationCap, BrainCircuit, Target, Code2, BookOpen } from 'lucide-react';

function LearningCenter() {
  return (
    <div className="max-w-4xl mx-auto pb-12">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold flex items-center justify-center text-green-400 mb-3">
          <GraduationCap className="mr-2" />
          Learning Center
        </h1>
        / /learning center educational content UI
        <p className="text-slate-600 dark:text-slate-400">
          Learn AI search algorithms and CSP concepts.
        </p>
      </div>

      {/* SECTION 1 */}
      <section className="glass-card p-6 mb-6">
        <h2 className="flex items-center text-primary text-xl font-bold mb-2">
          <BrainCircuit className="mr-2" />
          Problem Formulation
        </h2>
        <p className="text-slate-500">
          Basic explanation of problem formulation including initial state, actions, transition model, goal test, and path cost.
        </p>
      </section>

      {/* SECTION 2 */}
      <section className="glass-card p-6 mb-6">
        <h2 className="flex items-center text-secondary text-xl font-bold mb-2">
          <Target className="mr-2" />
          Heuristic Functions
        </h2>
        <p className="text-slate-500">
          Heuristic functions estimate the cost from a current state to the goal and guide informed search algorithms like A* and Greedy search.
        </p>
      </section>

      {/* SECTION 3 */}
      <section className="glass-card p-6 mb-6">
        <h2 className="flex items-center text-accent text-xl font-bold mb-2">
          <Code2 className="mr-2" />
          Constraint Satisfaction Problems (CSP)
        </h2>
        <p className="text-slate-500">
          CSP involves variables, domains, and constraints. Sudoku is solved using backtracking search with constraint checking.
        </p>
      </section>

      {/* ALGOS SECTION */}
      <section className="glass-card p-6">
        <h2 className="flex items-center text-purple-400 text-xl font-bold mb-2">
          <BookOpen className="mr-2" />
          Algorithms Guide
        </h2>

        <p className="text-slate-500">
          BFS, DFS, UCS, Greedy Search, A* Search, and Backtracking are key algorithms used in this project.
        </p>
      </section>

    </div>
  );
}

export default LearningCenter;