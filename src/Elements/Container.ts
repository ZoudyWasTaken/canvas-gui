import { Position } from "Utils/Util";
import Element from "./Element";
export default class Container extends Element {
    private children: Array<Element> = new Array;
    constructor(context: CanvasRenderingContext2D, pos: Position) {
        super(context);
        this.render(context, pos);
    }

    append(child: Element): void {
        this.children.push(child);
        return;
    }

    render(context: CanvasRenderingContext2D, pos: Position | null): void {
        if (pos == null)
            pos = this.pos;
        const prev_fillstyle = context.fillStyle;
        
        this.children.forEach((child: Element) => {
            child.render(context, { 
                x: pos.x + child.pos.x,
                y: pos.y + child.pos.y
            });
            child.update();
        });

        context.fillStyle = prev_fillstyle;
        return;
    }

    update(): void {
        return;
    }
}
