import { PointInterface } from '../interfaces/point';
import { Actor } from './actor';

export class FPSViewer extends Actor {
    constructor(public position: PointInterface = { x: 8, y: 20 }) {
        super(position);
    }

    draw(ctx: CanvasRenderingContext2D, size: PointInterface, delta: number) {
        const fps = (1 / delta).toFixed(0);
        ctx.font = '18px Consolas';
        ctx.fillStyle = '#000';
        ctx.fillText(`FPS: ${fps}`, this.position.x, this.position.y);
    }
}
