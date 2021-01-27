declare module "Utils/text" {
    export default function draw_text(context: CanvasRenderingContext2D, text: string, x: number, y: number, color?: string): void;
}
declare module "Elements/Element" {
    export default class Element {
        id: number;
        x: number;
        y: number;
        width: number;
        height: number;
        onclick: Function | null;
        onmouseenter: Function | null;
        onmouseleave: Function | null;
        onmouseover: Function | null;
        onmouseup: Function | null;
        onmousedown: Function | null;
        constructor(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number);
        render(context: CanvasRenderingContext2D | null): void;
        update(): void;
        inside(object: Element, x: number, y: number): boolean;
    }
}
declare module "Elements/Button" {
    import Element from "Elements/Element";
    export default class Button extends Element {
        text: string;
        constructor(context: CanvasRenderingContext2D, text: string, x: number, y: number, width: number, height: number);
        render(context: CanvasRenderingContext2D | null): void;
        update(): void;
    }
}
declare module "Elements/Text" {
    import Element from "Elements/Element";
    export default class Text extends Element {
        text: string;
        constructor(context: CanvasRenderingContext2D, text: string, x: number, y: number);
        render(context: CanvasRenderingContext2D): void;
        update(): void;
    }
}
declare module "index" {
    export const ELEMENTS_: any[];
}
