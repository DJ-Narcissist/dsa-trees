/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues()  {
    const countSumValues =  () => {
      if (!node) return 0;
      let sum = node.val;
      for (const child of node.children){
        sum += countSumValues(child);
      }
      return sum;
    }

  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    const countEvensInNode = () => {
      if (!node) return 0;
      let count = (node.val % 2 === 0) ? 1 : 0;
      for (const child of node.children) {
        count += countEvensInNode(child);
      }
      return count
    }
    return countEvensInNode(this.root)
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    const numGreaterInNode = () => {
      if (!node) return 0;
      let count = node.val > lowerBound ? 1 : 0;
      for (const child of node.children) {
        count += numGreaterInNode(child,lowerBound);
      }
      return count
    }
    return numGreaterInNode(this.root, lowerBound);
  }
}

module.exports = { Tree, TreeNode };
