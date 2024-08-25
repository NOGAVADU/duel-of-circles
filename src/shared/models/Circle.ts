export abstract class Circle {
    canvas: HTMLCanvasElement;
    x: number;
    y: number;
    radius: number;
    color;

    constructor(
        canvas: HTMLCanvasElement,
        x: number,
        y: number,
        radius: number,
        color: string,
    ) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    protected draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}