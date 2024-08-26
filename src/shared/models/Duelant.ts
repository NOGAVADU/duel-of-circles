import {MovingCircle} from "./MovingCircle.ts";
import {Spell} from "./Spell.ts";

export class Duelant extends MovingCircle {
    mouseState: {
        x: number,
        y: number,
        hasCoordsListener: boolean,
        clickAction: () => void,
        clicked: boolean
    };
    spells: Spell[] = [];

    constructor(
        x: number,
        y: number,
        radius: number,
        color: string,
        speed: number,
        onClick: () => void,
    ) {
        super(x, y, radius, color, speed);
        this.mouseState = {
            x: 0,
            y: 0,
            hasCoordsListener: false,
            clickAction: onClick,
            clicked: false
        }
    }

    init(context: CanvasRenderingContext2D) {
        this.draw(context);
        this.activeWallCollide(context)
        this.activeSpellShooting(context)
        this.activeMouseEventsListener(context)
        this.activeCursorCollide()
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
        if (!this.mouseState.hasCoordsListener) return

        if (this.mouseState.x < this.x + this.radius && this.mouseState.x > this.x - this.radius) {
            if (this.speed > 0) {
                if (this.mouseState.y > this.y + this.radius - 10 &&
                    this.mouseState.y < this.y + this.radius + 5) {
                    this.speed = -this.speed;
                }
            } else {
                if (this.mouseState.y > this.y - this.radius - 5 &&
                    this.mouseState.y < this.y - this.radius + 10) {
                    this.speed = -this.speed
                }
            }
        }

    }

    activeSpellShooting(context: CanvasRenderingContext2D) {
        this.spells = this.spells.filter(s => !s.destroyed)
        this.spells.forEach(s => s.init(context))
    }

    activeMouseEventsListener(context: CanvasRenderingContext2D) {
        const getMouseCoords = (e: MouseEvent) => {
            const rect = context.canvas.getBoundingClientRect();
            if (rect) {
                this.mouseState.x = e.clientX - rect.left;
                this.mouseState.y = e.clientY - rect.top;
            }
        }

        const handleClick = () => {
            if (!this.mouseState.clicked) {
                if (Math.sqrt(
                    Math.pow(this.mouseState.x - this.x, 2) + Math.pow(this.mouseState.y - this.y, 2
                    )) <= this.radius + 10) {
                    this.mouseState.clickAction()
                    this.mouseState.clicked = true;
                }
            }
        }

        if (!this.mouseState.hasCoordsListener) {
            context.canvas.addEventListener("mousemove", getMouseCoords);
            this.mouseState.clicked = false;
            this.mouseState.hasCoordsListener = true;
        }

        if (this.mouseState.hasCoordsListener) {
            context.canvas.addEventListener("click", handleClick)


            context.canvas.addEventListener("mouseout", () => {
                if (this.mouseState.hasCoordsListener) {
                    context.canvas.removeEventListener("mousemove", getMouseCoords)
                    context.canvas.removeEventListener("click", handleClick)
                    this.mouseState.hasCoordsListener = false
                }
            })
        }
    }
}
