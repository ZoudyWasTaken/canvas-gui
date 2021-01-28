import TextUtil from "Utils/TextUtil";
import { Position } from "Utils/Util";
import Element from "./Element";
export default class Text extends Element {
    text: string;
    constructor(context: CanvasRenderingContext2D, text: string, pos: Position) {
        function getWidth(): number {
            return (context.canvas.width / 16) - 12 * text.length;
        }

        function getHeight(): number {
            return (context.canvas.height / 16) - 12;
        }

        super(context, {
            width: getWidth(), 
            height: getHeight() 
        }, pos);

        this.text = text;
        this.render(context, pos);
    }

    render(context: CanvasRenderingContext2D, pos: Position | null): void {
        if (pos == null)
            pos = this.pos;
        const prev_fillstyle = context.fillStyle;

        TextUtil.draw_text(context, this.text, pos);

        context.fillStyle = prev_fillstyle;
        return;
    }

    update(): void {
        return;
    }
}
