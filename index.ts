import Button from "./Elements/Button";
import Text from "./Elements/Text";

const context: CanvasRenderingContext2D | null = (<HTMLCanvasElement>document.getElementById('painting')).getContext('2d');
if (context == null) throw new Error('Found canvas but failed to get context "2d" ;(');

var width: number = context.canvas.width;
var height: number = context.canvas.height;
var fps: number = 0;
var times: Array<number> = [];
var running: boolean = true;
var show_fps: boolean = true;

function getFPS(): number {
    var now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) times.shift();
    times.push(now);
    fps = times.length;
    return fps;
}

function registerElement(func, ...args) {
    const _a = new func(context, ...args);
    _a.onclick = function(e) {
        console.log('Clicked!', e);
    }
    _a.onmousedown = function() {
        console.log('Moused down!');
    }
    _a.onmouseup = function() {
        console.log('Moused up!');
    }
    return _a;
}

export const ELEMENTS_ = [
    registerElement(Button, "Button #1", 100, 75, 125, 25),
    registerElement(Button, "Pizza time!", 100, 75 * 2, 125, 25),
    registerElement(Text, "TEXT", 500, 500)
]

window['getButtonById'] = function(id: number) {
    return ELEMENTS_.filter((val) => val.id == id)[0];
}

console.log(ELEMENTS_)

var fps_c: Text = registerElement(Text, "", 10, 20);
function main(): void {
    context.fillRect(0, 0, width, height);
    
    fps_c.text = `${getFPS()} fps`;
    show_fps ? fps_c.render(context) : null;

    ELEMENTS_.forEach((e) => {            
        try {
            e.render(context);
            e.update();
        } catch(err) {
            var _el_name =  e.toString().split(" ")[1].split("]")[0];
            console.log("Unable to render element '" + _el_name + "'. \n", err);
        }
    });

    if (running) 
        requestAnimationFrame(main);
}

main();