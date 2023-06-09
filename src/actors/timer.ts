import { PointInterface } from "../interfaces/point";
import { Actor } from "./actor";

export class Timer extends Actor {
    private timeElapsed: number = 0;

    constructor(public position: PointInterface = { x: 190, y: 25 }) {
        super(position);
    }

    update(delta: number) {
        this.timeElapsed += delta;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.font = "bold 18px Consolas";
        ctx.fillStyle = "blue";
        ctx.fillText(
            `Time: ${this.timeElapsed.toFixed(1)}s`,
            this.position.x,
            this.position.y
        );
    }
}
