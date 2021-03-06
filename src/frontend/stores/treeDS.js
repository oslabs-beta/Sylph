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

const containerTypes = ['div', 'h1', 'section'];

class Tree {
	//name is type of html element
	constructor(element, name, parent, attributes) {
		this.element = element;
		this.name = name;
		this.attributes = attributes;
		this.parent = parent || null;
		this.depth = parent ? parent.depth + 1 : 0;
		this.id = 'node' + this.depth;
		this.items = [];
		this.isContainer = containerTypes.includes(name); // bool
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

	// add child
	appendChild(node) {
		this.items.push(node);

		// * if element type is h1, h2, h3 or p, something that cannot be nested, prevent appendChild
		// if (type === 'H' || 'P') {
		// 	throw new Error(`${element} cannot be nested`);
		// }

		//this.items.push(child);
		return this;
	}

	// todo: append element at givin parent, and particular position
	appendChildAtIndex(parent, idx) {}

	// return all the children element
	getChildren() {
		return this.items;
	}

	getParentElement() {
		return this.parent;
	}

	// todo: remove child, need to refactor the logic
	// todo: need to re-assign parent and children after delete a child ??
	removeChild(arg) {
		if (typeof arg === 'number' && this.items[arg]) {
			return this.items.splice(arg, 1).shift();
		}
		if (arg instanceof Tree) {
			return this.removeChild(arg);
		}
		throw new Error('Invalid argument ' + arg);
	}

	/** from App.svelte
   * let nodes = {
    //container for all nodes displayed in sandbox
		node1: { 
      id: 'node1',
      name: 'HTML',
      items: []
    },
    //all component nodes are REQUIRED to be placed below this line
    //not shown on the page
    node2: { id: 'node2', name: 'div', items: [] },
    node3: { id: 'node3', name: 'h1', items: [] }, 
    node4: { id: 'node4', name: 'section', items: [] },
    node5: { id: 'node5', name: 'img' }
	}
   */
	// * need to traverse all elements, and convert them into string
	// * Output: `<div><h1 class = ''>hello world </div> <div ${this.attributes}> </div>`
	toString() {
		return `<${this.name} ${Object.entries(this.attributes)
			.map(([key, value]) => `${key}= ${`"${value}"`}`)
			.join(' ')}
			${
				this.isContainer
					? '>\n\t' +
					  this.items.map((child) => child.toString()).join('\n') +
					  `</${this.name}>`
					: '/>'
			}
		`;
		/* 
		// traverseDF
		// Stack to store the nodes
		let nodes = [];
		let output = [];

		// Push the current node onto the stack
		nodes.push(root);
		// Loop while the stack is not empty
		while (nodes.length != 0) {
			// Store the current node and pop it from the stack
			let curr = nodes.pop();
			// Current node has been travarsed
			if (curr != null) {
				console.log(curr.name);
				output.push(`<${curr.name} ${curr.attributes}>`);

				// Store all the children of current node from right to left.
				for (let i = curr.items.length - 1; i >= 0; i--) {
					nodes.push(curr.items[i].name);
				}
			}
		}
		// add closing tags
		// ! not working
		// for (let i = output.length - 1; i >= 0; i--) {
		// 	output.push(`</${output[i]}>`);
		// }

		// concatenate output array into one string
		return output.join(' ');
		//return output; */
	}
}

// const containerTypes = ['div', 'h1', 'section'];
//element, name, parent, id
let nodeA = new Tree('a', 'div', null, { background: 'black', id: 'nodeA' });
// nodeA.attributes = { background: 'black', font: '12' };
//console.log(nodeA);

let nodeB = new Tree('b', 'h1', nodeA, { background: 'black', id: 'nodeB' });
// nodeB.attributes = { background: 'black', font: '12' };
let nodeC = new Tree('c', 'section', nodeA, {
	background: 'black',
	id: 'nodeC',
});
// nodeC.attributes = { background: 'black', font: '12' };
let nodeD = new Tree('d', 'h1', nodeA, { background: 'black', id: 'nodeD' });
// nodeD.attributes = { background: 'black', font: '12' };

let nodeE = new Tree('e', 'h1', nodeB, { background: 'black', id: 'nodeE' });
// nodeE.attributes = { background: 'black', font: '12' };
let nodeF = new Tree('f', 'section', nodeB, {
	background: 'black',
	id: 'nodeF',
});
// nodeF.attributes = { background: 'black', font: '12' };

let nodeG = new Tree('g', 'G', nodeC, { background: 'black', id: 'nodeG' });
// nodeG.attributes = { background: 'black', font: 12 };

/* let nodeH = new Tree('h', 'H', nodeD);
let nodeI = new Tree('i', 'I', nodeD);
let nodeJ = new Tree('j', 'J', nodeD);
nodeD.appendChild(nodeH);
nodeD.appendChild(nodeI);
nodeD.appendChild(nodeJ); */

let nodeK = new Tree('k', 'K', nodeE, { background: 'black', id: 'nodeK' });
// nodeK.attributes = { background: 'black', font: 12 };

nodeA.appendChild(nodeB);
nodeA.appendChild(nodeC);
nodeA.appendChild(nodeD);
nodeB.appendChild(nodeE);
nodeB.appendChild(nodeF);
nodeC.appendChild(nodeG);
nodeE.appendChild(nodeK);

// nodeA.attributes = 'I am Groot';
// nodeB.attributes = 'hi nodeB';
// nodeC.attributes = 'this is nodeC';

/**  tree structure
 *           A
 *    B      C       D
 *  E  F     G     H I J
 * K
 */

//console.log('root is: ', nodeB.getRoot());
let testing = nodeA.toString();
console.log('output arr is', testing);
//console.log(nodeB)
/************* */
