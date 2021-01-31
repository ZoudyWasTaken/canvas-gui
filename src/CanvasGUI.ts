import BooleanToggle from "./Elements/BooleanToggle";
import Button from "./Elements/Button";
import Checkbox from "./Elements/Checkbox";
import Container from "Elements/Container";
import Element from "./Elements/Element";
import IterableToggle from "./Elements/IterableToggle";
import Text from "./Elements/Text";

export default class CanvasGUI {
    private context: CanvasRenderingContext2D;
    private fps: number = 0;
    private main_container: Container;
    private MAX_FPS: number;
    private show_fps: boolean;
    private running: boolean;
    private times: Array<number> = [];

    static BooleanToggle = BooleanToggle;
    static Button = Button;
    static Checkbox = Checkbox;
    static Container = Container;
    static Element = Element;
    static IterableToggle = IterableToggle;
    static Text = Text;

    constructor(context: CanvasRenderingContext2D, options?: { run?: boolean, showFPS?: boolean, maxFPS?: number }) {
        this.context = context;
        this.main_container = new Container(context, { x: 0, y: 0 });
        this.MAX_FPS = options?.maxFPS || 60;
        this.show_fps = options?.showFPS || true;
        this.running = options?.run || true;
        this.run();
    }

    run() {
        var cwidth: number = this.context.canvas.width;
        var cheight: number = this.context.canvas.height;        
        var fps_counter: Text = new Text("", { x: 10, y: 20 });
        fps_counter.setContext(this.context);
        const loop = (): void => {
            this.context.fillStyle = "black";
            this.context.fillRect(0, 0, cwidth, cheight);
            
            if (this.show_fps) 
                fps_counter.setText(`${this.getFPS()} / ${this.MAX_FPS} fps`);

            this.main_container.render(null);
            this.main_container.update();
        }
        setInterval(() => {
            if (this.running)
                loop();
        }, this.getFPS());
    }

    appendChild(child: Element): void {
        this.main_container.appendChild(child);
        return;
    }

    getElementById(id: string) {
        return this.main_container.getChildren().find((e: Element) => e.id == id);
    }

    getContext(): CanvasRenderingContext2D {
        return this.context;
    }

    createElement(name: string, options?: {}): Element {
        switch(name.toLowerCase()) {
            case "button":
                return new Button("", { x: 0, y: 0 });
            case "checkbox":
                return new Checkbox(false, { x: 0, y: 0 });
            case "container":
                return new Container(this.getContext(), { x: 0, y: 0 });
            case "element":
                return new Element();
            case "text":
                return new Text("", { x: 0, y: 0 });
            default:
                return new Element();
        }
    }

    private getFPS(): number {
        var now = performance.now();
        while (this.times.length > 0 && this.times[0] <= now - 1000) this.times.shift();
        this.times.push(now);
        this.fps = this.times.length;
        return this.fps > this.MAX_FPS ? this.MAX_FPS : this.fps;
    }
}