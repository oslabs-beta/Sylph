/// <reference types="svelte" />
declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onconsider?: (any) => void;
    onfinalize?: (any) => void;
  }
}
