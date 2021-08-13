import { writable } from 'svelte/store';

let sandboxTree = writable(null);

export { sandboxTree };
