import {Circle} from "./Circle.ts";
import {Duelant} from "./Duelant.ts";

export class Spell extends Circle {
    speed: number;
    destroyed: boolean = false;
    target: Duelant;
    onTargetHit: () => void;

    constructor(
        x: number,
        y: number,
        radius: number,
        color: string,
        speed: number,
        target: Duelant,
        onTargetHit: () => void,
    ) {
        super(x, y, radius, color);
        this.speed = speed;
        this.target = target;
        this.onTargetHit = onTargetHit;
    }

    init(context: CanvasRenderingContext2D) {
        this.draw(context);
        this.activeTargetCollide(context)
    }

    draw(context: CanvasRenderingContext2D) {
        super.draw(context);

        this.x += this.speed
    }

    destroySpell(context: CanvasRenderingContext2D) {
        context.fillStyle = 'transparent'
        this.destroyed = true
    }

    activeWallCollide(context: CanvasRenderingContext2D) {
        if (this.x + this.speed > context.canvas.width || this.x + this.speed < 0) {
            this.destroySpell(context)
        }
    }

    activeTargetCollide(context: CanvasRenderingContext2D) {
        if (!context.canvas || !this.target || this.destroyed) return;

        if (Math.sqrt(Math.pow(this.x - this.target.x, 2) + Math.pow(this.y - this.target.y, 2)) <= (
            this.radius + this.target.radius
        )) {
            if (!this.destroyed) {
                this.onTargetHit()
                this.destroySpell(context)
            }
        }
    }
}