import { Position, Util } from "./Util";

export default class TextUtil extends Util {
    static draw_text(context: CanvasRenderingContext2D, text: string, pos: Position, color: string = 'white'): void {
        var prev_fillstyle = context.fillStyle;

        var size = (context.canvas.width / 32);

        context.fillStyle = color;
        context.font = size + 'px serif';
        context.fillStyle = "white";
        context.fillText(text, pos.x, pos.y + size - 24);    

        context.fillStyle = prev_fillstyle;
        return;
    }
}
