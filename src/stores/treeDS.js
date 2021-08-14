/* export class TreeNode {
	constructor(data, type) {
		this.data = data;
		this.type = type;
		this.children = [];
		this.id = Math.floor(Math.random() * 100000);
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
} */

class Tree {
	constructor(element, type, parent, id) {
		this.depth = parent ? parent.depth + 1 : 0;
		this.element = element;
		this.type = type;
		this.parent = parent || null;

		// ! id is not fully working
		this.id = id || this.nodeId(parent);
		this.children = [];
	}

	// todo: need to refactor
	nodeId(parent) {
		if (parent) {
			return [parent.id, parent.type, parent.children.length].join('-');
		} else {
			return '0';
		}
	}

	//check root
	getRoot() {
		let node = this;
		if (!node.parent) return this;
		while (node.parent) {
			node = node.parent;
		}
		return node;
	}

	// ? check if element is root, is this method necessary??
	isRoot() {
		return !this.parent;
	}

	// add child
	appendChild(element, type, id) {
		let child = new Tree(this, element, type, id);

		// * if element type is h1, h2, h3 or p, something that cannot be nested, prevent appendChild
		// if (type === 'H' || 'P') {
		// 	throw new Error(`${element} cannot be nested`);
		// }

		this.children.push(child);
		return this;
	}

	// todo: append element at givin parent, and particular position
	appendChildAtIndex(parent, idx) {}

	// return all the children element
	getChildren() {
		return this.children;
	}

	getParentElement() {
		return this.parent;
	}

	// todo: remove child, need to refactor the logic
	// todo: need to re-assign parent and children after delete a child ??
	removeChild(arg) {
		if (typeof arg === 'number' && this.children[arg]) {
			return this.children.splice(arg, 1).shift();
		}
		if (arg instanceof Tree) {
			return this.removeChild(arg);
		}
		throw new Error('Invalid argument ' + arg);
	}

	// todo: remove everything
	removeAll() {}

	// todo: traverse ??
	traverse() {
		//traverse up
		//traverse down
	}

	// todo: convert all elements into string
	toString() {
		// need to traverse all elements, and convert them into string
	}

	// todo: find a certain element
	find() {
		// * search a particular element in the tree
	}
}

//element, type, parent, id
let nodeA = new Tree('a', 'string', null, 0);
//console.log(nodeA);

let nodeB = new Tree('b', 'string2', nodeA);
let nodeC = new Tree('c', 'string3', nodeA);
nodeA.appendChild(nodeB);
nodeA.appendChild(nodeC);

console.log('nodeB is ', nodeB);
console.log('nodeC is ', nodeC);
console.log('nodeA is ', nodeA);

/************* */
