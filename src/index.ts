import CanvasGUI from "./CanvasGUI";

const context: CanvasRenderingContext2D | null = (<HTMLCanvasElement>document.getElementById("painting")).getContext('2d');

if (context == null) throw new Error('Found canvas but failed to get context "2d" ;(');

const gui = new CanvasGUI(context);

var btn = new CanvasGUI.Button("Button #1", { x: 125, y: 25 });
btn.onclick = function() {
    console.log("CLICKED");
}
gui.appendChild(btn);
gui.appendChild(new CanvasGUI.Button("Pizza time!", { x: 125, y: 25 * 4 }));
gui.appendChild(new CanvasGUI.Text("TEXT", { x: 500, y: 500 }));
gui.appendChild(new CanvasGUI.IterableToggle(["Yay", "Oh"], { x: 400, y: 400 }));

var c = new CanvasGUI.Checkbox(false, { x: 300, y: 300 }, 3);
c.id = "co";
c.onclick = function() {
    console.log("CLICKED CHECKBOX");
}
c.onchange = function(e) {
    console.log(e);
}
gui.appendChild(c);

gui.getElementById("co").addEventListener("click", function() {
    console.log("Test")
});

window['gui'] = gui;