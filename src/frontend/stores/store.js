// import { persistStore } from './persistStore';
// import { DivElement } from '../classes/HTMLElements';

// //state can be imported into any svelte file and accessed with $store
// export const store = persistStore('store', initialState);

import { writable } from 'svelte/store';

let nodes = {
  //container for all nodes displayed in sandbox
  node1: {
    id: 'node1',
    name: 'body',
    items: [],
  },
};
//global state node tree built in the sandbox with DnD
export const nodeStore = writable(nodes, () =>
  console.log('NODESTORE ', nodeStore)
);
//global state of nested node in nodestore that is currently (if any) selected in sandbox.
export const activeNode = writable(null, () =>
  console.log('ACTIVENODE ', activeNode)
);
//global state to conditionally display attribute editor field
export const editorBody = writable('none', () =>
  console.log('editorBody ', editorBody)
);
//global state to conditionally display message to enter id to edit attributes
export const IDBody = writable('block', () => console.log('IDBody ', IDBody));
