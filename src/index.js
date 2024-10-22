export default class Graph {
  constructor(rows = 8, cols = 8) {
    this.nodeList = [];
    this.arr = new Array(rows);
    for (let i = 0; i < rows; i++) {
      this.arr[i] = new Array(cols);
    }
  }

  addNode(node) {
    // import new Node class
    // push node into nodelist
    this.nodeList.push(node)
  }

  addEdge(src, dst) {
    this.arr[src][dst] = 1;
  }

  checkEdge(src, dst) {
    if (this.arr[src][dst] === 1) {
      return true
    }
    return false
  }

  print() {
    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < this.arr[i].length; j++) {
        console.log(`${this.arr[i][j]} `)
      }
    }
  }
}