// import { persistStore } from './persistStore';
// import { DivElement } from '../classes/HTMLElements';

// let uid = () => `_${Math.random().toString(35).substr(2, 9)}`;
// const initial = new DivElement();
// console.log('INITIAL', initial);
// const initialState = [initial];
// // Logic invoked when dropped on DnD area

// // addElement/component function {
// //new HTML element / node / component (whatever we're calling it)
// // element.id = uid()
// // element.class = value from bind
// // etc attributes
// // parentID
// //children []
// // }

// //state can be imported into any svelte file and accessed with $store
// export const store = persistStore('store', initialState);

import { writable } from 'svelte/store';

let nodes = {
  //container for all nodes displayed in sandbox
  node1: {
    id: 'node1',
    name: 'HTML',
    items: [],
  },
  //all component nodes are REQUIRED to be placed below this line
  //not shown on the page
  node2: { id: 'node2', name: 'div', items: [] },
  node3: { id: 'node3', name: 'h1', items: [] },
  node4: { id: 'node4', name: 'section', items: [] },
  node5: { id: 'node5', name: 'img' },
};
export const nodeStore = writable(nodes, () =>
  console.log('NODESTORE ', nodeStore)
);
export const activeNode = writable(null, () =>
  console.log('ACTIVENODE ', activeNode)
);
