/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    const  minDepthHelper = (node) => {
      if (!node) return 0;
      if (!node.left && !node.right) return 1;
      if (!node.left) return minDepthHelper(node.right) + 1;
      if (!node.right) return minDepthHelper(node.left) + 1;
      return Math.min(minDepthHelper(node.left), minDepthHelper(node.right)) + 1;
    }
    return minDepthHelper(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    const maxDepthHelper = (node) => {
      if (!node) return 0;
      return 1 + Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right)) + 1
    }
    return maxDepthHelper(this.root)
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = { maxSum: Number.MIN_SAFE_INTEGER };
    const findMaxSum = (node) => {
      if (!node) return 0;
      let left = Math.max(0, findMaxSum(node.left));
      let right = Math.max(0, findMaxSum(node.right));
      result.maxSum = Math.max(result.maxSum, node.val + left + right);
      return node.val + Math.max(left, right);
    }
    findMaxSum(this.root);
    return result.maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let result = { val: null };

    const findNextLarger = (node, lowerBound) => {
      if (!node) return;
      if (node.val > lowerBound && (result.val === null || node.val <  result.val)) {
        result.val = node.val;
      }
      findNextLarger(node.left, lowerBound);
      findNextLarger(node.right, lowerBound);
    }
    findNextLarger(this.root,lowerBound)
    return result.val
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    const getParentAndDepth = (node, target, depth = 0, parent = null) => {
      if (!node) return null;
      if (node === target) return { parent, depth };
      return getParentAndDepth(node.left, target, depth +1, node) ||
             getParentAndDepth(node.right, target, depth +1, node) 
    };

    let node1Info = getParentAndDepth(this.root, node1);
    let node2Info = getParentAndDepth(this.root, node2);
    
    return node1Info && node2Info &&
           node1Info.depth === node2Info.depth &&
           node1Info.parent !== node2Info.parent;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {
    const serializeHelper = (node) => {
      if (!node) return 'null.';
      return `${node.val}.${serializeHelper(node.left)}${serializeHelper(node.right)}`;
    };

    return serializeHelper(root);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    let list = stringTree.split(',');

    const deserializeHelper = (list) => {
      let val = list.shift();
      if (val === 'null') return null;
      let node = new BinaryTreeNode(parseInt(val,10));
      node.left = deserializeHelper(list);
      node.right = deserializeHelper(list);
      return node;
    }
    return deserializeHelper(list);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    const lca = (node, node1, node2) => {
      if (!node || node === node1 || node === node2) return node;
      let left = lca(node.left, node1, node2);
      let rightt = lca(node.right, node1, node2);
      if (left && right) return node;
      return left || right;
    };
    return lca(this.root, node1, node2);    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
