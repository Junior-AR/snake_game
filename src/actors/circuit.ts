import { PointInterface } from '../interfaces/point';
import { Actor } from './actor';
import { Barrier } from './barrier';
import { Car } from './car';

export class Circuit extends Actor {
    public gameFinished: boolean;
    public barriers: Barrier[];
    public nextBarrierToTouch: number;
    public currentBarrierTouching: number;
    public firstPoint: boolean;

    constructor(public position: PointInterface, public car: Car) {
        super(position);
        this.gameFinished = false;
        this.firstPoint = false;
        this.barriers = [];
        this.nextBarrierToTouch = 0;
        this.currentBarrierTouching = 0;

        for (let i = 0; i < 5; i++) {
            this.barriers.push(new Barrier({ x: this.position.x + i * 60, y: this.position.y }, { w: 15, h: 30 }, this.car, this.barriers[i - 1]));
        }
    }

    update() {
        for (let i = 0; i < this.barriers.length; i++) {
            if (!this.barriers[i].touched) {
                break;
            }
            this.nextBarrierToTouch = i + 1;
        }

        this.currentBarrierTouching = this.barriers.findIndex((barrier) => barrier.touching);

        if (this.barriers[this.barriers.length - 1].touched) {
            this.gameFinished = true;
            this.restart();
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.gameFinished) {
            ctx.font = '25px Consolas';
            ctx.fillStyle = '#90be6d';
            ctx.fillText('HAS GANADO', 175, 480);
            
        }

        ctx.font = '18px Consolas';
        ctx.fillStyle = '#000';

        if (!this.gameFinished) {
            if (this.currentBarrierTouching === -1 && !this.firstPoint) {
                ctx.fillText(`Inicia la carrera`, 10, 490);
            } else {
                this.firstPoint = true;
                ctx.fillText(`Punto: ${this.nextBarrierToTouch}`, 10, 490);
            }
            ctx.fillText(`Siguiente: ${this.nextBarrierToTouch + 1}`, 360, 490);
        }
    }

    restart() {
        this.car.restart();
    }
}
