import Node from './node';
import { deleteHelper, checkHelper, createArray } from './helperfunctions';
import queue from './queue';

export default class Tree {
  constructor(arr) {
    this.arr = arr;
    this.root = null;
  }

  sortFilter() {
    const unsortedFilteredArray = this.arr;
    const sortedUnfinishedArray = unsortedFilteredArray.sort((a, b) => a - b);
    const fixedArray = checkHelper(sortedUnfinishedArray)
    this.arr = fixedArray
    return this.arr
  }

  buildTree(array = this.sortFilter()) {
    if (array.length === 0) return null;
    const mid = Math.floor(array.length / 2)
    const node = new Node(array[mid])

    node.left = this.buildTree(array.slice(0, mid))
    node.right = this.buildTree(array.slice(mid + 1)) // middle index is reserved as root, +1 needed when using .slice()
    return node
  }

  // accepts value of new node and root node as parameter
  insert(value, node) {
    const root = node;
    if (!Number.isInteger(value)) {
      return null;
    }
    if (this.root === null) {
      this.root = new Node(value);
      return this.root
    }
    if (root.data === value) {
      console.log(`Duplicate Value: ${root.data}`)
      return node
    }

    if (value < root.data) {
      if (root.left === null) {
        root.left = new Node(value);
      } else {
        root.left = this.insert(value, root.left)
      }
    }
    else if (value > root.data) {
      if (root.right === null) {
        root.right = new Node(value)
      } else {
        root.right = this.insert(value, root.right)
      }
    }
    return root
  }

  // recursive
  deleteItem(value, node) {
    const root = node;
    if (root === null) return root;

    // call similar to insert(), traverse down tree until exists if block
    if (value < root.data) {
      root.left = this.deleteItem(value, root.left)
    } else if (value > root.data) {
      root.right = this.deleteItem(value, root.right)
    } else {
      // Leaf node
      if (root.left === null && root.right === null) {
        // remove parent root pointer to node of interest
        return null;
      }
      // One child
      if (root.left === null) {
        return root.right
      } // returns pointer of the base case's child to be the pointer of the previous recursive call's root
      if (root.right === null) {
        return root.left
      }
      // Two children
      // find min of right subtree
      const minSibling = deleteHelper(root.right);
      root.data = minSibling.data;
      root.right = this.deleteItem(minSibling.data, root.right)
    }
    return root
  }

  find(value, node = this.root) {
    let root = node;

    while (root.data !== value) {
      if (value < root.data) {
        root = root.left
      }
      if (value > root.data) {
        root = root.right
      }
      if (root === null) {
        return null
      }
    }
    return root;
  }

  async levelOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function must be provided')
    };
    if (this.root === null) {
      return
    };
    queue.enqueue(this.root)
    while (!queue.isEmpty()) {
      const current = queue.dequeue();
      try {
        // await in loop is fine as we expect a response one at a time
        // eslint-disable-next-line no-await-in-loop
        await callback(current)
      }
      catch (error) {
        console.error('Callback error', error);
      }
      if (current.left !== null) queue.enqueue(current.left)
      if (current.right !== null) queue.enqueue(current.right)
    }
  }

  async preOrder(callback, node) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function must be provided')
    };
    const root = node;
    if (root === null) return;
    try {
      // await in loop is fine as we expect a response one at a time
      // eslint-disable-next-line no-await-in-loop
      await callback(root)
    }
    catch (error) {
      console.error('Callback error', error);
    }
    // must await otherwise reverts to BFS
    await this.preOrder(callback, root.left);
    await this.preOrder(callback, root.right);
  }

  async inOrder(callback, node) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function must be provided')
    };
    const root = node;
    if (root === null) return;
    await this.inOrder(callback, root.left);
    try {
      // await in loop is fine as we expect a response one at a time
      // eslint-disable-next-line no-await-in-loop
      await callback(root)
    }
    catch (error) {
      console.error('Callback error', error);
    }
    await this.inOrder(callback, root.right);
  }

  async postOrder(callback, node) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function must be provided')
    };
    const root = node;
    if (root === null) return;
    await this.postOrder(callback, root.left);
    await this.postOrder(callback, root.right);
    try {
      // await in loop is fine as we expect a response one at a time
      // eslint-disable-next-line no-await-in-loop
      await callback(root)
    }
    catch (error) {
      console.error('Callback error', error);
    }
  }

  height(node) {
    // empty tree is equal -1
    if (node === null) return -1;
    const root = node;
    const leftHeight = this.height(root.left)
    const rightHeight = this.height(root.right)
    // height of node is max height of its subtrees plus one(important to account for connection to node)
    return Math.max(leftHeight, rightHeight) + 1
  }

  depth(node) {
    let depth = 0;
    let current = this.root;
    while (current) {
      if (node.data < current.data) {
        current = current.left
        depth++;
      } else if (node.data > current.data) {
        current = current.right
        depth++;
      } else
        return depth
    }
    return -1;
  }

  isBalanced(rootNode = this.root) {
    // difference between heights of left subtree and right subtree of every node is not >1
    function modifiedHeight(node) {
      if (node === null) {
        return 0;
      }
      const leftHeight = modifiedHeight(node.left);
      if (leftHeight === -1) {
        return -1;
      }
      const rightHeight = modifiedHeight(node.right);
      if (rightHeight === -1) {
        return -1;
      }
      if (Math.abs(leftHeight - rightHeight) > 1) {
        return -1
      }
      return Math.max(leftHeight, rightHeight) + 1 // height of subtree
    }
    return modifiedHeight(rootNode) !== -1
  }

  async inOrderArray(callback, node, array = []) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function must be provided')
    };
    const root = node;
    if (root === null) return array;
    await this.inOrderArray(callback, root.left, array);
    try {
      await callback(root, array);
    }
    catch (error) {
      console.error('Callback error', error);
    }
    await this.inOrderArray(callback, root.right, array)
    return array;
  }

  // if calling in a module, make sure to use top-level await
  async rebalance() {
    const data = await this.inOrderArray(createArray, this.root);
    console.log(data);
    this.arr = data;
    this.root = this.buildTree(data)
  }
}