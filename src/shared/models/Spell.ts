import {Circle} from "./Circle.ts";

export class Spell extends Circle {
    speed: number

    constructor(
        x: number,
        y: number,
        radius: number,
        color: string,
        speed: number
    ) {
        super(x, y, radius, color);
        this.speed = speed;
    }

    init(ctx: CanvasRenderingContext2D) {
        this.draw(ctx);
    }

    draw(context: CanvasRenderingContext2D) {
        super.draw(context);

        this.x += this.speed
    }
}