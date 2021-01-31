import { Position } from "Utils/Util";
import Element from "./Element";
export default class Checkbox extends Element {
    private checked: boolean;

    onchange: Function | null = null;

    constructor(checked: boolean = false, pos: Position, size?: number, context?: CanvasRenderingContext2D) {
        super();
        this.setPosition(pos);
        
        if (size == null)
            size = 1;

        this.setSize({ width: 10 * size, height: 10 * size });
        this.checked = checked;

        if (context) 
            this.setContext(context);

        this.addEventListener("click", () => {
            this.setChecked(!this.checked);
            if (this.onchange != null) 
                this.onchange({ oldValue: !this.checked, newValue: this.checked });
        }, false);
    }

    private drawCheckmark(context: CanvasRenderingContext2D, pos: Position) {
        // FIXME: checkmarkkkkkkkkk???
        var color = "red";
        context.fillStyle = color;
        context.fillRect(this.getPosition().x + 4, this.getPosition().y + 4, this.getSize().width - 8, this.getSize().height - 8)
    }

    render(pos: Position): void {
        const context = this.getContext();
        const prev_fillstyle = context.fillStyle;

        context.fillStyle = "white";
        context.fillRect(this.getPosition().x, this.getPosition().y, this.getSize().width, this.getSize().height);

        if (this.checked)
            this.drawCheckmark(context, this.getPosition());

        context.fillStyle = prev_fillstyle;
        return;
    }

    isChecked(): boolean {
        return this.checked;
    }

    setChecked(checked: boolean): void {
        this.checked = checked;
        return;
    }

    update(): void {
        return;
    }
}