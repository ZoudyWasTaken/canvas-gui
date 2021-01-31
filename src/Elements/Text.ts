import TextUtil from "Utils/TextUtil";
import { Position } from "Utils/Util";
import Element from "./Element";
export default class Text extends Element {
    private text: string;
    constructor(text: string, pos: Position, context?: CanvasRenderingContext2D) {
        super();
        this.setPosition(pos);

        if (context) {
            this.setContext(context);
            this.setSize({
                width: this.getContext().canvas.width / 16 - 12 * text.length,
                height: this.getContext().canvas.height / 16 - 12
            });
        }

        this.text = text;
    }

    render(pos: Position): void {
        const context = this.getContext();
        const prev_fillstyle = context.fillStyle;

        TextUtil.draw_text(context, this.text, pos);

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