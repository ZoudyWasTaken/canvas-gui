import TextUtil from "Utils/TextUtil";
import { Rect, Position } from "Utils/Util";
import Element from "./Element";
export default class IterableToggle extends Element {
    private value: string;

    onchange: Function | null = null;

    constructor(values: Array<any>, pos: Position, size?: Rect, context?: CanvasRenderingContext2D) {
        super();
        this.setPosition(pos);
        this.setSize(size || { width: 125, height: 25 });
        
        this.setValue(values[0].toString());

        if (context) 
            this.setContext(context);
        
        this.addEventListener("click", () => {
            var oldval = this.getValue();

            var index = values.indexOf(this.getValue()) + 1;
            console.log(values, index);
            if (index >= values.length) {
                this.setValue(values[0]);
                console.log("VALUE SET TO 0");
            } else {
                this.setValue(values[index++]);
                console.log("VALUE SET TO " + index++);
            }

            if (this.onchange != null) 
                this.onchange({ oldValue: oldval, newValue: this.getValue() });
        }, false);
    }

    render(pos: Position): void {
        const context = this.getContext();
        const prev_fillstyle = context.fillStyle;

        context.fillStyle = "aqua"; 
        context.fillRect(pos.x - (this.getSize().width / 64), pos.y + (this.getSize().height / 16), this.getSize().width, this.getSize().height);
        context.fillStyle = "blue";
        context.fillRect(pos.x, pos.y, this.getSize().width, this.getSize().height);

        var text = `Value: ${this.getValue()}`;
        TextUtil.draw_text(context, text, { 
            x: (pos.x + this.getSize().width / 5 - (text.length)), 
            y: (pos.y + this.getSize().height) 
        });
        
        context.fillStyle = prev_fillstyle;
        return;
    }

    getValue(): string {
        return this.value;
    }

    setValue(value: string): void {
        this.value = value;
        return;
    }

    update(): void {
        return;
    }
}