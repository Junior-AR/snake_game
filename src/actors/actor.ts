import { PointInterface } from '../interfaces/point';
import { ActorInterface } from './../interfaces/actor.d';

export class Actor implements ActorInterface {
    constructor(public position: PointInterface) {
        this.position = position;
    }

    update(delta: number, size?: PointInterface) {}
    draw(ctx: CanvasRenderingContext2D, size?: PointInterface, delta?: number) {}
    keyboardEventDown(key: string) {}
    keyboardEventUp(key: string) {}
    restart() {}
}
