import { Receiver } from './receiver';
import { EventProperties, Options } from './events';
export interface JQueryShim<TElement = HTMLElement> {
    toArray(): TElement[];
}
export declare function link(this: Receiver, links: Element | Array<Element> | JQueryShim | null, event: string | Function, properties?: EventProperties | Function, options?: Options): Receiver;
export type LinkArgs = Parameters<typeof link>;
export declare function form(this: Receiver, forms: HTMLFormElement | Array<HTMLFormElement> | null, event: string | Function, properties?: EventProperties | Function, options?: Options): Receiver;
export type FormArgs = Parameters<typeof form>;
//# sourceMappingURL=auto-track.d.ts.map