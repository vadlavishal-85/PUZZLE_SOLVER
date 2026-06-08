class PriorityQueue {
  constructor() { this.items = []; }
  enqueue(el, priority) {
    const qe = { el, priority };
    let added = false;
    for(let i=0; i<this.items.length; i++) {
      if(this.items[i].priority > qe.priority) {
        this.items.splice(i, 0, qe); added = true; break;
      }
    }
    if(!added) this.items.push(qe);
  }
  dequeue() { return this.items.shift(); }
  isEmpty() { return this.items.length === 0; }
}

const getNeighbors = (grid, r, c) => {
  const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
  const res = [];
  for(let [dr, dc] of dirs) {
    const nr = r+dr, nc = c+dc;
    if(nr>=0 && nr<grid.length && nc>=0 && nc<grid[0].length && grid[nr][nc] !== 1) {
      res.push([nr, nc]);
    }
  }
  return res;
};

const serialize = (r, c) => `${r},${c}`;
const manhattan = (r1, c1, r2, c2) => Math.abs(r1-r2) + Math.abs(c1-c2);

export const solveMaze = (grid, start, goal, algorithm) => {
  const startR = start[0], startC = start[1];
  const goalR = goal[0], goalC = goal[1];
  
  // Handle Bidirectional Search
  if (algorithm === 'bidirectional') {
    return solveMazeBidirectional(grid, start, goal);
  }
  
  let nodesExpanded = 0;
  const startTime = performance.now();
  const history = []; // To animate explored nodes
  
  const pq = new PriorityQueue();
  pq.enqueue({ r: startR, c: startC, path: [[startR, startC]], cost: 0 }, 0);
  
  const explored = new Map();
  explored.set(serialize(startR, startC), 0);

  // DFS uses a stack (LIFO) to explore deeply first.
  const stack = [{ r: startR, c: startC, path: [[startR, startC]], cost: 0 }];
  // BFS uses a queue (FIFO) to explore breadth-first.
  const queue = [{ r: startR, c: startC, path: [[startR, startC]], cost: 0 }];

  while (true) {
    let current;
    
    if (algorithm === 'dfs') {
      // Depth First Search: pop from stack
      if(stack.length === 0) break;
      current = stack.pop();
    } else if (algorithm === 'bfs') {
      // Breadth First Search: shift from queue
      if(queue.length === 0) break;
      current = queue.shift();
    } else {
      // A* / UCS / Greedy use priority queue
      if(pq.isEmpty()) break;
      current = pq.dequeue().el;
    }

    const { r, c, path, cost } = current;
    nodesExpanded++;
    if(r !== startR || c !== startC) history.push({r, c, type: 'visited'});

    if (r === goalR && c === goalC) {
      const time = performance.now() - startTime;
      return { success: true, path, history, nodesExpanded, time, depth: path.length - 1 };
    }

    const neighbors = getNeighbors(grid, r, c);
    
    for (let [nr, nc] of neighbors) {
      const newCost = cost + 1;
      const key = serialize(nr, nc);
      
      let shouldExplore = false;
      if (algorithm === 'dfs' || algorithm === 'bfs') {
        if (!explored.has(key)) {
          explored.set(key, newCost);
          shouldExplore = true;
        }
      } else {
        if (!explored.has(key) || newCost < explored.get(key)) {
          explored.set(key, newCost);
          shouldExplore = true;
        }
      }

      if (shouldExplore) {
        history.push({r: nr, c: nc, type: 'frontier'});
        const nextState = { r: nr, c: nc, path: [...path, [nr, nc]], cost: newCost };
        
        if (algorithm === 'dfs') {
          // Add neighbor to DFS stack
          stack.push(nextState);
        } else if (algorithm === 'bfs') {
          // Add neighbor to BFS queue
          queue.push(nextState);
        } else if (algorithm === 'ucs') {
          // Uniform Cost Search: priority by path cost
          pq.enqueue(nextState, newCost);
        } else if (algorithm === 'greedy') {
          // Greedy best-first: priority by heuristic distance to goal
          pq.enqueue(nextState, manhattan(nr, nc, goalR, goalC));
        }
      }
    }
    
    if(nodesExpanded > 5000) break; // Hard limit for safety
  }
  
  return { success: false, history, reason: "No path found." };
};

const solveMazeBidirectional = (grid, start, goal) => {
  const startR = start[0], startC = start[1];
  const goalR = goal[0], goalC = goal[1];
  
  let nodesExpanded = 0;
  const startTime = performance.now();
  const history = [];
  
  // Forward search from start
  const forwardQueue = [{ r: startR, c: startC, path: [[startR, startC]], cost: 0 }];
  const forwardExplored = new Map();
  forwardExplored.set(serialize(startR, startC), { path: [[startR, startC]], cost: 0 });
  
  // Backward search from goal
  const backwardQueue = [{ r: goalR, c: goalC, path: [[goalR, goalC]], cost: 0 }];
  const backwardExplored = new Map();
  backwardExplored.set(serialize(goalR, goalC), { path: [[goalR, goalC]], cost: 0 });
  
  let meetingPoint = null;
  let meetingKey = null;
  
  while (forwardQueue.length > 0 && backwardQueue.length > 0 && !meetingPoint) {
    // Expand forward
    const forwardSize = forwardQueue.length;
    for (let i = 0; i < forwardSize && !meetingPoint; i++) {
      const current = forwardQueue.shift();
      const { r, c, path, cost } = current;
      nodesExpanded++;
      if(r !== startR || c !== startC) history.push({r, c, type: 'visited'});
      
      const neighbors = getNeighbors(grid, r, c);
      for (let [nr, nc] of neighbors) {
        const key = serialize(nr, nc);
        const newCost = cost + 1;
        
        // Check if this node was found by backward search
        if (backwardExplored.has(key)) {
          meetingPoint = true;
          meetingKey = key;
          const forwardData = { path, cost: newCost };
          const backwardData = backwardExplored.get(key);
          
          // Reconstruct path: forward path + reverse of backward path
          const finalPath = [...path, [nr, nc], ...backwardData.path.slice(1).reverse()];
          const time = performance.now() - startTime;
          return { success: true, path: finalPath, history, nodesExpanded, time, depth: finalPath.length - 1 };
        }
        
        if (!forwardExplored.has(key)) {
          forwardExplored.set(key, { path: [...path, [nr, nc]], cost: newCost });
          history.push({r: nr, c: nc, type: 'frontier'});
          forwardQueue.push({ r: nr, c: nc, path: [...path, [nr, nc]], cost: newCost });
        }
      }
    }
    
    // Expand backward
    const backwardSize = backwardQueue.length;
    for (let i = 0; i < backwardSize && !meetingPoint; i++) {
      const current = backwardQueue.shift();
      const { r, c, path, cost } = current;
      nodesExpanded++;
      if(r !== goalR || c !== goalC) history.push({r, c, type: 'visited'});
      
      const neighbors = getNeighbors(grid, r, c);
      for (let [nr, nc] of neighbors) {
        const key = serialize(nr, nc);
        const newCost = cost + 1;
        
        // Check if this node was found by forward search
        if (forwardExplored.has(key)) {
          meetingPoint = true;
          meetingKey = key;
          const forwardData = forwardExplored.get(key);
          const backwardData = { path, cost: newCost };
          
          // Reconstruct path: forward path + reverse of backward path
          const finalPath = [...forwardData.path, ...backwardData.path.slice(1).reverse()];
          const time = performance.now() - startTime;
          return { success: true, path: finalPath, history, nodesExpanded, time, depth: finalPath.length - 1 };
        }
        
        if (!backwardExplored.has(key)) {
          backwardExplored.set(key, { path: [...path, [nr, nc]], cost: newCost });
          history.push({r: nr, c: nc, type: 'frontier'});
          backwardQueue.push({ r: nr, c: nc, path: [...path, [nr, nc]], cost: newCost });
        }
      }
    }
    
    if(nodesExpanded > 5000) break; // Hard limit for safety
  }
  
  return { success: false, history, reason: "No path found." };
};
