import draw_text from "Utils/text";
import Element from "./Element";
export default class Text extends Element {
    text: string;
    constructor(context: CanvasRenderingContext2D, text: string, x: number, y: number) {
        function getWidth(): number {
            return (context.canvas.width / 16) - 12 * text.length;
        }

        function getHeight(): number {
            return (context.canvas.height / 16) - 12;
        }

        super(context, x, y, getWidth(), getHeight());

        this.text = text;
        this.render(context);
    }

    render(context: CanvasRenderingContext2D) {
        const prev_fillstyle = context.fillStyle;

        draw_text(context, this.text, this.x, this.y, (context.canvas.width / 16));

        context.fillStyle = prev_fillstyle;
        return;
    }

    update(): void {
        return;
    }
}