export default function draw_text(context: CanvasRenderingContext2D, text: string, x: number, y: number, color: string = 'white'): void {
    var prev_fillstyle = context.fillStyle;

    var size = (context.canvas.width / 32);

    context.fillStyle = color;
    context.font = size + 'px serif';
    context.fillStyle = "white";
    context.fillText(text, x, y + size - 24);    

    context.fillStyle = prev_fillstyle;
    return;
}