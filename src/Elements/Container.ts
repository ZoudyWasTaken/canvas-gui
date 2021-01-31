import { Position } from "Utils/Util";
import Element from "./Element";
export default class Container extends Element {
    private children: Array<Element> = new Array;
    constructor(context: CanvasRenderingContext2D | null, pos?: Position) {
        super();
        this.setPosition(pos || { x: 0, y: 0 });
        this.setContext(context);
    }

    render(pos: Position): void {
        const context = this.getContext();
        const prev_fillstyle = context.fillStyle;
        
        this.children.forEach((child: Element) => {
            child.render({ 
                x: this.getPosition().x + child.getPosition().x,
                y: this.getPosition().y + child.getPosition().y
            });
            child.update();
        });

        context.fillStyle = prev_fillstyle;
        return;
    }

    appendChild(child: Element): void {
        child.setContext(this.getContext());
        this.children.push(child);
        return;
    }

    getChildren(): Array<Element> {
        return this.children;
    }

    update(): void {
        return;
    }
}