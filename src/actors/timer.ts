import { PointInterface } from '../interfaces/point';
import { Actor } from './actor';

export class Timer extends Actor {
    public timeElapsed: number = 0;

    constructor(public position: PointInterface = { x: 190, y: 20 }) {
        super(position);
    }

    draw(ctx: CanvasRenderingContext2D, size: PointInterface, delta: number) {
        this.timeElapsed += delta;
        ctx.font = 'bold 18px Consolas';

        ctx.fillStyle = '#f28482';
        ctx.fillText(`Time: ${this.timeElapsed.toFixed(1)}s`, this.position.x, this.position.y);
    }
}
