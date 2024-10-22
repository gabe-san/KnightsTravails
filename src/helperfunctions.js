function checkHelper(array) {
  if (array.length === 0) return [];
  const noDuplicatesArray = [array[0]];
  for (let i = 1; i < array.length; i++) {
    if (array[i] !== array[i - 1]) {
      noDuplicatesArray.push(array[i])
    }
  }
  return noDuplicatesArray
}

function deleteHelper(node) {
  let curr = node;
  while (curr.left !== null) {
    curr = curr.left;
  }
  return curr;
}

// callback function to test levelOrder() 
function printNode(node) {
  console.log(`Current node: ${node.data}`);
}

function createArray(node, array) {
  array.push(node.data)
}

function generateRandomArray(min, max, length) {
  // eslint-disable-next-line array-callback-return
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1) + min))
}

export { deleteHelper, checkHelper, printNode, createArray, generateRandomArray }