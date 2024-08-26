import {Circle} from "./Circle.ts";

export class Duelant extends Circle {
    speed: number;

    constructor(
        x: number,
        y: number,
        radius: number,
        color: string,
        speed: number,
    ) {
        super(x, y, radius, color);
        this.speed = speed;
    }

    init(context: CanvasRenderingContext2D) {
        this.draw(context);
        this.activeWallCollide(context)
    }

    draw(context: CanvasRenderingContext2D) {
        super.draw(context);

        this.y += this.speed
    }

    activeWallCollide(context: CanvasRenderingContext2D) {
        if (
            this.y + this.speed + this.radius > context.canvas.height ||
            this.y + this.speed - this.radius < 0
        ) {
            this.speed = -this.speed;
        }
    }
}