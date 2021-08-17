import { persistStore } from './persistStore';
import { DivElement } from '../classes/HTMLElements';

let uid = () => `_${Math.random().toString(35).substr(2, 9)}`;
const initial = new DivElement();
console.log('INITIAL', initial);
const initialState = [initial];
// Logic invoked when dropped on DnD area

// addElement/component function {
//new HTML element / node / component (whatever we're calling it)
// element.id = uid()
// element.class = value from bind
// etc attributes
// parentID
//children []
// }

//state can be imported into any svelte file and accessed with $store
export const store = persistStore('store', initialState);
