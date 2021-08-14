import { writable } from 'svelte/store';

let sandboxElementCounter = writable(0);
let sandboxTree = writable(null);

export { sandboxElementCounter, sandboxTree };
