import draw_text from "Utils/text";
import Element from "./Element";
export default class Button extends Element {
    text: string;
    constructor(context: CanvasRenderingContext2D, text: string, x: number, y: number, width: number, height: number) {
        super(context, x, y, width, height);
        this.text = text;
        this.render(context);
    }

    render(context: CanvasRenderingContext2D | null): void {
        const prev_fillstyle = context.fillStyle;

        if (this.inside(this, 170, 96)) {
            context.fillStyle = "darkblue";
        } else {
            context.fillStyle = "aqua";
        }        
        context.fillRect(this.x - (this.width / 32), this.y + (this.height / 8), this.width, this.height);

        context.fillStyle = "blue";
        context.fillRect(this.x, this.y, this.width, this.height);

        context.fillStyle = prev_fillstyle;
        draw_text(context, this.text, (this.x + this.width / 5), (this.y + this.height));
        return;
    }

    update(): void {
        return;
    }
}