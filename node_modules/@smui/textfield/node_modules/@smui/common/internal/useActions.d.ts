export declare type SvelteActionReturnType<P> = {
    update?: (newParams?: P) => void;
    destroy?: () => void;
} | void;
export declare type SvelteHTMLActionType<P> = (node: HTMLElement, params?: P) => SvelteActionReturnType<P>;
export declare type HTMLActionEntry<P extends any = any> = SvelteHTMLActionType<P> | [SvelteHTMLActionType<P>, P];
export declare type HTMLActionArray = HTMLActionEntry[];
export declare type SvelteSVGActionType<P> = (node: SVGElement, params?: P) => SvelteActionReturnType<P>;
export declare type SVGActionEntry<P extends any = any> = SvelteSVGActionType<P> | [SvelteSVGActionType<P>, P];
export declare type SVGActionArray = SVGActionEntry[];
export declare type ActionArray = HTMLActionArray | SVGActionArray;
export declare function useActions(node: HTMLElement | SVGElement, actions: ActionArray): {
    update(actions: ActionArray): void;
    destroy(): void;
};
