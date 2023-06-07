import { PointInterface } from './point.d';

export interface ActorInterface {
    position: Point;
    update: (delta: number, size?: PointInterface) => void;
    draw: (ctx: CanvasRenderingContext2D, size?: PointInterface, delta?: number) => void;
    keyboardEventDown: (key: string) => void;
    keyboardEventUp: (key: string) => void;
    restart: () => void;
}
