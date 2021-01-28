import Container from "Elements/Container";
import Button from "./Elements/Button";
import Text from "./Elements/Text";

const context: CanvasRenderingContext2D | null = (<HTMLCanvasElement>document.getElementById('painting')).getContext('2d');
if (context == null) throw new Error('Found canvas but failed to get context "2d" ;(');

var cwidth: number = context.canvas.width;
var cheight: number = context.canvas.height;
var fps: number = 0;
var MAX_FPS: number = 60;
var times: Array<number> = [];
var running: boolean = true;
var show_fps: boolean = true;

function getFPS(): number {
    var now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) times.shift();
    times.push(now);
    fps = times.length;
    return fps > MAX_FPS ? MAX_FPS : fps;
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
    registerElement(Button, "Button #1", { width: 125, height: 25 }, { x: 125, y: 25 }),

    registerElement(Button, "Pizza time!", { width: 125, height: 25 }, { x: 125, y: 25 * 4 }),

    registerElement(Text, "TEXT", { x: 500, y: 500 })
]

window['ELEMENTS_'] = ELEMENTS_;

const cont = new Container(context, { x: 40, y: 40 });
for (var i = 0; i < ELEMENTS_.length; ++i)
    cont.append(ELEMENTS_[i]);

console.log(ELEMENTS_);

var fps_c: Text = registerElement(Text, "", { x: 10, y: 20 });
function main(): void {
    context.fillRect(0, 0, cwidth, cheight);
    
    fps_c.text = `${getFPS()}/${MAX_FPS} fps`;
    show_fps ? fps_c.render(context, null) : null;

    cont.render(context, null);
    cont.update();
}

setInterval(function() {
    if (running)
        main();
}, getFPS());

//main();
