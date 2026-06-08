//implemenation of bfs and dfs for maze solving

const getNeighbors = (grid, r, c) => {
  const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
  const res = [];

  for (let [dr, dc] of dirs) {
    const nr = r + dr;
    const nc = c + dc;

    if (
      nr >= 0 &&
      nr < grid.length &&
      nc >= 0 &&
      nc < grid[0].length &&
      grid[nr][nc] !== 1
    ) {
      res.push([nr, nc]);
    }
  }

  return res;
};

const serialize = (r, c) => `${r},${c}`;

export const solveMaze = (grid, start, goal, algorithm) => {
  const [startR, startC] = start;
  const [goalR, goalC] = goal;

  const explored = new Set();
  const history = [];

  const structure =
    algorithm === "dfs"
      ? [{ r: startR, c: startC, path: [[startR, startC]] }]
      : [{ r: startR, c: startC, path: [[startR, startC]] }];

  explored.add(serialize(startR, startC));

  while (structure.length) {
    const current =
      algorithm === "dfs"
        ? structure.pop()
        : structure.shift();

    const { r, c, path } = current;

    history.push({ r, c, type: "visited" });

    if (r === goalR && c === goalC) {
      return {
        success: true,
        path,
        history
      };
    }

    for (const [nr, nc] of getNeighbors(grid, r, c)) {
      const key = serialize(nr, nc);

      if (!explored.has(key)) {
        explored.add(key);

        structure.push({
          r: nr,
          c: nc,
          path: [...path, [nr, nc]]
        });
      }
    }
  }

  return { success: false, history };
};