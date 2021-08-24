/// <reference types="svelte" />
declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onconsider?: (unknown) => void;
    onfinalize?: (unknown) => void;
  }
}
