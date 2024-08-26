import {Circle} from "./Circle.ts";

export class MovingCircle extends Circle {
    speed: number;

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
}