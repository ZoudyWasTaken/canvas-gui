import TextUtil from "Utils/TextUtil";
import { Rect, Position } from "Utils/Util";
import Element from "./Element";
export default class Button extends Element {
    innerText: string;
    constructor(context: CanvasRenderingContext2D, text: string, size: Rect, pos: Position) {
        super(context, {
            width: size.width, 
            height: size.height
        }, pos);
        this.innerText = text;
        this.render(context, this.pos);
    }

    render(context: CanvasRenderingContext2D | null, pos: Position = this.pos): void {
        const prev_fillstyle = context.fillStyle;

        // if (this.inside(this, { x: 170, y: 96 })) {
        //     context.fillStyle = "darkblue";
        // } else {

        context.fillStyle = "aqua"; 
        context.fillRect(pos.x - (this.size.width / 32), pos.y + (this.size.height / 8), this.size.width, this.size.height);

        context.fillStyle = "blue";
        context.fillRect(pos.x, pos.y, this.size.width, this.size.height);

        context.fillStyle = prev_fillstyle;
        TextUtil.draw_text(context, this.innerText, { 
            x: (pos.x + this.size.width / 5), 
            y: (pos.y + this.size.height) 
        });
        
        return;
    }

    update(): void {
        return;
    }
}
