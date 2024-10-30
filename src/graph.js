import Queue from './queue';

export default class Graph {
  static isValid(pos) {
    // pos = [x,y]
    // n = n x n chessboard size
    // output return true if position is valid within constraints of chessboard else return false
    const n = 8;
    if (pos[0] >= 0 && pos[0] < n && pos[1] >= 0 && pos[1] < n) {
      return true
    }
    return false
  }

  // time complexity 0n^2
  // space complexity On^2
  // can improve by doing bidirectional BFS(two queues: one starting from src and another from dst)
  // heuristic search : .max(abs(y-x/2))
  // early pruning: avoid unnecessary check (ex: if abs of newx and dstx > abs of currentx and dstx => skip iteration)
  static knightMoves(src, dst) {
    const visited = new Set();
    const route = new Map();
    const dx = [2, 1, 1, 2, -1, -2, -1, -2];
    const dy = [1, -2, 2, -1, -2, -1, 2, 1];
    if (!this.isValid(src) || !this.isValid(dst)) {
      return null
    }
    const queue = new Queue();
    // const queueDst = new Queue();
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
  // call if(this.bfsCheck(include all the queues, sets, maps, dx, dy)) return this.reconstruct both route paths
  /* static bfsCheck(queue, visitedsrc, route, visited dst, dx, dy)
    current = queue.dequeue
    for loop() same as above, but new if checks
    if (newpos is valid) -> newpos.toString
    if( visiteddst has newpos.toString) -> route.set(newpos.toString, current)
    return true;
    if(visitedsrc does not have newpos.toString()) -> visited.add(newpos.toString) and route.set(newpos.string,current);
    queue.push(newpos)
    return false for no if check pass
*/

  /* if doing bidirectional BFS:
  reconstruct(routesrc, routedst, src, dst)
  const pathsrc = [];
  let current = dst;
  while (current is not null)
   -pathsrc.push(current);
  current = route.get(current.toString());
  end of loop 1
  const pathdst = [];
  current = routedst.get(dst.toString());
  while (current is not null) 
  routedst.push(current)
  current = routedst.get(current.toString())
  return pathsrc.reverse().concat(pathdst)
*/
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