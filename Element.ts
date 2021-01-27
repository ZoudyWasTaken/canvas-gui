export default class Element {
    id: number = Math.floor(Math.random() * 420);
    x: number;
    y: number;
    width: number;
    height: number;

    onclick: Function | null = null;
    onmouseenter: Function | null = null;
    onmouseleave: Function | null = null;   
    onmouseover: Function | null = null;
    onmouseup: Function | null = null;
    onmousedown: Function | null = null;

    constructor(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        ["click", "mouseup", "mousedown"].forEach((key: string) => {
            context.canvas.addEventListener(key, (e: MouseEvent) => {
                var func_ = this["on" + key];
                if (this.inside(this, e.clientX, e.clientY) && func_ && (func_ instanceof Function)) 
                    func_(e);
            });
        });
    }

    render(context: CanvasRenderingContext2D | null): void { 
        return;
    }

    update(): void {
        return;
    }

    inside(object: Element, x: number, y: number): boolean {
        if ((x >= object.x) && (x <= object.x + object.width) && (y >= object.y) && (y <= object.y + object.height))
            return true;
        return false;
    }
}