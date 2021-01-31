import TextUtil from "Utils/TextUtil";
import { Rect, Position } from "Utils/Util";
import Element from "./Element";
export default class BooleanToggle extends Element {
    private state: boolean;

    onchange: Function | null = null;

    constructor(state: boolean, pos: Position, size?: Rect, context?: CanvasRenderingContext2D) {
        super();
        this.setPosition(pos);
        this.setSize(size || { width: 125, height: 25 });
        this.state = state;

        if (context) 
            this.setContext(context);
        
        this.addEventListener("click", () => {
            this.setState(!this.getState());
            if (this.onchange != null) 
                this.onchange({ oldValue: !this.getState(), newValue: this.getState() });
        }, false);
    }

    render(pos: Position): void {
        const context = this.getContext();
        const prev_fillstyle = context.fillStyle;

        if (!this.getState()) {
            context.fillStyle = "aqua"; 
            context.fillRect(pos.x - (this.getSize().width / 64), pos.y + (this.getSize().height / 16), this.getSize().width, this.getSize().height);
            context.fillStyle = "blue";
            context.fillRect(pos.x, pos.y, this.getSize().width, this.getSize().height);
        } else {
            context.fillStyle = "red"; 
            context.fillRect(pos.x - (this.getSize().width / 64), pos.y + (this.getSize().height / 16), this.getSize().width, this.getSize().height);
            context.fillStyle = "darkred";
            context.fillRect(pos.x, pos.y, this.getSize().width, this.getSize().height);
        }

        var text = `Toggle: ${this.getState() ? "ON" : "OFF"}`;
        TextUtil.draw_text(context, text, { 
            x: (pos.x + this.getSize().width / 5 - (text.length)), 
            y: (pos.y + this.getSize().height) 
        });
        
        context.fillStyle = prev_fillstyle;
        return;
    }

    getState(): boolean {
        return this.state;
    }

    setState(state: boolean): void {
        this.state = state;
        return;
    }

    update(): void {
        return;
    }
}