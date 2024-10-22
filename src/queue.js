class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }

  // property accessors O(1) time complexity
  enqueue(item) {
    this.items[this.tail] = item;
    this.tail++;
  }

  dequeue() {
    if (this.head === this.tail) {
      throw new Error('empty queue')
    }
    const item = this.items[this.head];
    delete this.items[this.head];
    this.head++;
    return item;
  }

  length() {
    if (this.head === this.tail) {
      throw new Error('empty queue')
    }
    return this.tail - this.head
  }

  head() {
    return this.items[this.head];
  }

  tail() {
    return this.items[this.tail];
  }

  isEmpty() {
    if (this.head === this.tail) {
      return true
    }
    return false;
  }
}

const queue = new Queue();
export default queue;