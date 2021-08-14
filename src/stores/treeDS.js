export class TreeNode {
  constructor(data) {
    this.data = data;
    this.children = [];
    this.id = null;
    this.parentId = null;
  }
}

export class Tree {
  constructor(data) {
    this.node = new TreeNode(data);
    this.root = this.node;
  }
  // todo: contains: check if particular element is in the tree
  contains() {}

  // todo: add child node to a given node
  add() {}

  // todo: delete a node
  delete() {}
}
