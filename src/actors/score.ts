import { PointInterface } from "../interfaces/point";
import { Actor } from "./actor";

export class ScoreViewer extends Actor {
    private score: number;

    constructor(public position: PointInterface = { x: 400, y: 25 }) {
        super(position);
        this.score = 0;
    }

    public updateScore() {
        this.score++;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.font = "24px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(`Score: ${this.score}`, this.position.x, this.position.y);
    }
}
