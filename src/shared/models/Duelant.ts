import {MovingCircle} from "./MovingCircle.ts";
import {Spell} from "./Spell.ts";

export class Duelant extends MovingCircle {
    mouseX: number = 0;
    mouseY: number = 0;
    spells: Spell[] = [];
    onClick: () => void;
    isClicked: boolean = false;

    constructor(
        x: number,
        y: number,
        radius: number,
        color: string,
        speed: number,
        onClick: () => void,
    ) {
        super(x, y, radius, color, speed);
        this.onClick = onClick
    }

    init(context: CanvasRenderingContext2D) {
        this.draw(context);
        this.activeWallCollide(context)
        this.activeCursorWatch(context)
        this.activeCursorCollide()
        this.activeClickAction(context)
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

    activeCursorCollide() {
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

    activeCursorWatch(context: CanvasRenderingContext2D) {
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
    }

    activeClickAction(context: CanvasRenderingContext2D) {
        context.canvas.addEventListener("click", () => {
            if (!this.isClicked) {
                if (
                    Math.sqrt(
                        Math.pow(this.mouseX - this.x, 2) + Math.pow(this.mouseY - this.y, 2)
                    ) <= this.radius + 5
                ) {
                    this.onClick()
                    this.isClicked = true
                }
            }
        })
        context.canvas.addEventListener("mouseout", () => {
            context.canvas.removeEventListener("click", this.onClick)
            this.isClicked = false
        })
    }
}
