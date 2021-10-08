// import { persistStore } from './persistStore';
// import { DivElement } from '../classes/HTMLElements';

// //state can be imported into any svelte file and accessed with $store
// export const store = persistStore('store', initialState);

import { writable } from 'svelte/store';
import { elements } from '../components/utilities/elements';

let nodes = {
  //container for all nodes displayed in sandbox
  node1: {
    id: 'node1',
    name: 'body',
    items: [],
  },
};
let globalStyle = {
  elementStyles: {},
  classStyles: {},
};
elements.forEach((element) => (globalStyle.elementStyles[element] = {}));

let classes = [];

//global state node tree built in the sandbox with DnD
export const nodeStore = writable(nodes, () =>
  console.log('NODESTORE ', nodeStore)
);
//global state of nested node in nodestore that is currently (if any) selected in sandbox.
export const activeNode = writable(null, () =>
  console.log('ACTIVENODE ', activeNode)
);

//global state of element selected in global element editor
export const activeGlobalElement = writable(null, () =>
  console.log('activeGlobalElement', activeGlobalElement)
);
//global state of global element and classes
export const globalClasses = writable(classes, () =>
  console.log('GLOBALCLASSES', globalClasses)
);
//global state of global element and classes
export const globalStyles = writable(globalStyle, () =>
  console.log('GLOBALSTYLES', globalStyles)
);
