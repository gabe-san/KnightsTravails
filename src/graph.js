import Queue from './queue';

export default class Graph {
  static isValid(pos) {
    // pos = [x,y]
    // n = n x n chessboard size
    // output return true if position is valid within constraints of chessboard else return false
    const n = 8;
    if (pos[0] >= 0 && pos[0] <= n - 1 && pos[1] >= 0 && pos[1] <= n - 1) {
      return true
    }
    return false
  }

  static knightMoves(src, dst) {
    const visited = new Set();
    const route = new Map();
    const dx = [2, 1, 1, 2, -1, -2, -1, -2];
    const dy = [1, -2, 2, -1, -2, -1, 2, 1];

    if (!this.isValid(src) || !this.isValid(dst)) {
      return null
    }
    const queue = new Queue();
    queue.enqueue(src);
    visited.add(src.toString());
    route.set(src.toString(), null);
    while (!queue.isEmpty()) {
      const current = queue.dequeue();
      if (current[0] === dst[0] && current[1] === dst[1]) {
        return this.reconstruct(route, dst)
      }
      for (let i = 0; i < dx.length; i++) {
        const newx = current[0] + dx[i];
        const newy = current[1] + dy[i];
        const newpos = [newx, newy]
        if (this.isValid(newpos) && !visited.has(newpos.toString())) {
          visited.add(newpos.toString())
          route.set(newpos.toString(), current);
          queue.enqueue(newpos)
        }
      }
    }
    return null
  }

  static reconstruct(route, dst) {
    const path = [];
    let current = dst;
    while (current !== null) {
      path.push(current);
      current = route.get(current.toString());
    }
    console.log(`You made it in ${path.length} moves! Here is your path:`)
    return path.reverse().forEach((element) => console.log(element));
  }
}