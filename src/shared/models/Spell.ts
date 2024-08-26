import {MovingCircle} from "./MovingCircle.ts";
import {Duelant} from "./Duelant.ts";

export class Spell extends MovingCircle {
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
        super(x, y, radius, color, speed);
        this.target = target;
        this.onTargetHit = onTargetHit;
    }

    init(context: CanvasRenderingContext2D) {
        this.draw(context);
        this.activeTargetCollide(context)
        this.activeWallCollide(context)
    }

    draw(context: CanvasRenderingContext2D) {
        super.draw(context);

        this.x += this.speed
    }

    activeWallCollide(context: CanvasRenderingContext2D) {
        if (this.x + this.speed > context.canvas.width || this.x + this.speed < 0) {
            this.destroySpell(context)
        }
    }

    activeTargetCollide(context: CanvasRenderingContext2D) {
        if (this.destroyed) return;

        if (Math.sqrt(Math.pow(this.x - this.target.x, 2) + Math.pow(this.y - this.target.y, 2)) <= (
            this.radius + this.target.radius
        )) {
                this.onTargetHit()
                this.destroySpell(context)
        }
    }

    destroySpell(context: CanvasRenderingContext2D) {
        context.fillStyle = 'transparent'
        this.destroyed = true
    }
}