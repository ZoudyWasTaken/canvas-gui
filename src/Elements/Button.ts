import TextUtil from "Utils/TextUtil";
import { Rect, Position } from "Utils/Util";
import Element from "./Element";
export default class Button extends Element {
    private text: string;
    private down: boolean;
    constructor(text: string, pos: Position, size?: Rect, context?: CanvasRenderingContext2D) {
        super();
        this.setPosition(pos);
        this.setSize(size || { width: 125, height: 25 });
        this.text = text;

        if (context) 
            this.setContext(context);

        this.addEventListener("click", () => {
            if (this.down)
                return;
            this.down = true;
            setTimeout(() => {
                this.down = false;
            }, 300);
        });
    }

    render(pos: Position): void {
        const context = this.getContext();
        const prev_fillstyle = context.fillStyle;

        context.fillStyle = "aqua"; 
        if (!this.down) {
            context.fillRect(pos.x - (this.getSize().width / 64), pos.y + (this.getSize().height / 16), this.getSize().width, this.getSize().height);    
        } else { 
            context.fillRect(pos.x - (this.getSize().width / 24), pos.y + (this.getSize().height / 8), this.getSize().width, this.getSize().height);    
        }

        context.fillStyle = "blue";
        context.fillRect(pos.x, pos.y, this.getSize().width, this.getSize().height);

        TextUtil.draw_text(context, this.text, { 
            x: (pos.x + this.getSize().width / 5), 
            y: (pos.y + this.getSize().height) 
        });
        
        context.fillStyle = prev_fillstyle;
        return;
    }

    getText(): string {
        return this.text;
    }

    setText(text: string): void {
        this.text = text;
        this.render(this.getPosition());
        return;
    }

    update(): void {
        return;
    }
}