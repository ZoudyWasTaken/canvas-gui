import EventListenerUtil from "Utils/EventListenerUtil";
import { Position, Rect } from "Utils/Util";

export default class Element extends EventListenerUtil {
    id: string;
    private pos: Position;
    private size: Rect;
    private context: CanvasRenderingContext2D;

    // Events
    onclick: Function | null = null;
    onmouseenter: Function | null = null;
    onmouseleave: Function | null = null;   
    onmouseover: Function | null = null;
    onmouseup: Function | null = null;
    onmousedown: Function | null = null;

    constructor(size: Rect = { width: 0, height: 0 }, pos?: Position, context?: CanvasRenderingContext2D) {
        super();
        this.setSize(size);
        this.setPosition(pos || { x: 0, y: 0 });
        if (context)
            this.setContext(context);
    }

    // RENDER & UPDATE
    render(pos: Position): void { 
        return;
    }

    update(): void {
        return;
    }

    // GETTERS & SETTERS
    setContext(context: CanvasRenderingContext2D): void {
        this.context = context;
        this.setup_listeners(context);
        this.render(this.getPosition());
        return;
    }

    getContext(): CanvasRenderingContext2D {
        return this.context;
    }

    setPosition(pos: Position): void {
        this.pos = pos;
        return;
    }

    getPosition(): Position {
        return this.pos;
    }

    setSize(size: Rect): void {
        this.size = size;
        return;
    }

    getSize(): Rect {
        return this.size;
    }

    // EXTRAS
    inside(object: Element, pos: Position): boolean {
        return (pos.x >= object.getPosition().x) && 
               (pos.x <= object.getPosition().x + object.getSize().width) && 
               (pos.y >= object.getPosition().y) && 
               (pos.y <= object.getPosition().y + object.getSize().height);
    }

    private setup_listeners(context: CanvasRenderingContext2D) {
        ["click", "mouseup", "mousedown", "mouseenter", "mouseleave", "mouseover"].forEach((key: string) => {
            context.canvas.addEventListener(key, (e: MouseEvent) => {
                if (this.inside(this, { x: e.clientX, y: e.clientY })) {
                    var func_ = this["on" + key];
                    if (func_ instanceof Function)
                        func_(e);
                    this.emit(key, e);
                }
            });
        });
    }
}