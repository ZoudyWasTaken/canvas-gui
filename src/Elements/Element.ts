import EventListenerUtil from "Utils/EventListenerUtil";
import { Position, Rect } from "Utils/Util";

export default class Element extends EventListenerUtil {
    id: string;
    pos: Position;
    size: Rect;

    onclick: Function | null = null;
    onmouseenter: Function | null = null;
    onmouseleave: Function | null = null;   
    onmouseover: Function | null = null;
    onmouseup: Function | null = null;
    onmousedown: Function | null = null;

    constructor(context: CanvasRenderingContext2D, size: Rect = { width: 0, height: 0 }, pos: Position = { x: 0, y: 0 }) {
        super();
        this.size = size;
        this.pos = pos;

        ["click", "mouseup", "mousedown", "mouseenter", "mouseleave", "mouseover"].forEach((key: string) => {
            context.canvas.addEventListener(key, (e: MouseEvent) => {
                var func_ = this["on" + key];
                if (this.inside(this, { x: e.clientX, y: e.clientY }) && func_ && (func_ instanceof Function)) {
                    this.emit(key, e);
                    func_(e);
                }
            });
        });
    }

    render(context: CanvasRenderingContext2D | null, pos: Position): void { 
        return;
    }

    update(): void {
        return;
    }

    inside(object: Element, pos: Position): boolean {
        return (pos.x >= object.pos.x) && 
               (pos.x <= object.pos.x + object.size.width) && 
               (pos.y >= object.pos.y) && 
               (pos.y <= object.pos.y + object.size.height);
    }
}
