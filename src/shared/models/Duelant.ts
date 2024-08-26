import {Circle} from "./Circle.ts";
import {Spell} from "./Spell.ts";

export class Duelant extends Circle {
    mouseX: number = 0;
    mouseY: number = 0;
    speed: number;
    spells: Spell[];

    constructor(
        x: number,
        y: number,
        radius: number,
        color: string,
        speed: number,
        spells: Spell[] = [],
    ) {
        super(x, y, radius, color);
        this.speed = speed;
        this.spells = spells;
    }

    init(context: CanvasRenderingContext2D) {
        this.draw(context);
        this.activeWallCollide(context)
        this.activeCursorCollide(context)
        this.activeSpellShooting(context)
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
            if (this.y >= context.canvas.height - this.radius) {
                this.y = context.canvas.height - this.radius;
            }
            if (this.y <= this.radius) {
                this.y = this.radius;
            }
        }
    }

    activeCursorCollide(context: CanvasRenderingContext2D) {
        const getMouseCoords = (e: MouseEvent) => {
            const rect = context.canvas.getBoundingClientRect();
            if (rect) {
                this.mouseX = e.clientX - rect.left;
                this.mouseY = e.clientY - rect.top;
            }
        }

        context.canvas.addEventListener("mousemove", getMouseCoords)
        context.canvas.addEventListener("mouseout", () => {
            context.canvas.removeEventListener("mousemove", getMouseCoords)
            this.mouseX = 0;
            this.mouseY = 0;
        })

        if (!this.mouseX && !this.mouseY) return

        if (this.mouseX < this.x + this.radius && this.mouseX > this.x - this.radius) {
            if (this.speed > 0) {
                if (this.mouseY > this.y + this.radius - 10 &&
                    this.mouseY < this.y + this.radius + 5) {
                    this.speed = -this.speed;
                }
            } else {
                if (this.mouseY > this.y - this.radius - 5 &&
                    this.mouseY < this.y - this.radius + 10) {
                    this.speed = -this.speed
                }
            }
        }
    }

    activeSpellShooting(context: CanvasRenderingContext2D) {
        this.spells = this.spells.filter(s => !s.destroyed)
        this.spells.forEach(s => s.init(context))
    }
}