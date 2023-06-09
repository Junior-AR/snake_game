import { PointInterface } from "../interfaces/point";
import { Actor } from "./actor";

export class FPSViewer extends Actor {
    private frameCount: number = 0;
    private fps: number = 0;

    constructor(public position: PointInterface = { x: 10, y: 25 }) {
        super(position);
    }

    update(delta: number) {
        this.frameCount++;
        this.fps = 1 / delta;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.font = "18px Consolas";
        ctx.fillStyle = "#000";
        ctx.fillText(`FPS: ${this.fps.toFixed(0)}`, this.position.x, this.position.y);
    }
}
