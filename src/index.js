import Tree from './binarytree';
import { generateRandomArray, printNode } from './helperfunctions';

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const arr = generateRandomArray(0, 100, 10);
console.log(arr)
const BSTree = new Tree(arr);
BSTree.root = BSTree.buildTree();
prettyPrint(BSTree.root)
console.log(BSTree.isBalanced())
// console.log(BSTree.levelOrder(printNode))
// console.log(BSTree.preOrder(printNode, BSTree.root))
// console.log(BSTree.inOrder(printNode, BSTree.root))
// console.log(BSTree.postOrder(printNode, BSTree.root))
BSTree.insert(110, BSTree.root)
BSTree.insert(130, BSTree.root)
BSTree.insert(140, BSTree.root)
BSTree.insert(150, BSTree.root)
BSTree.insert(200, BSTree.root)
prettyPrint(BSTree.root)
console.log(BSTree.isBalanced())
await BSTree.rebalance();
console.log(BSTree.isBalanced())
prettyPrint(BSTree.root)
// console.log(BSTree.levelOrder(printNode))
// console.log(BSTree.preOrder(printNode, BSTree.root))
console.log(BSTree.inOrder(printNode, BSTree.root))
// console.log(BSTree.postOrder(printNode, BSTree.root))