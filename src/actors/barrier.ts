import { PointInterface } from './../interfaces/point.d';
import { SizeInterface } from '../interfaces/size';
import { Actor } from './actor';
import { Car } from './car';
import { distance } from '../utils/distance';

interface ColorInterface {
    yellow: string;
    blue: string;
    red: string;
    orange: string;
}

export class Barrier extends Actor {
    public colors: ColorInterface;
    public touched: boolean;
    public touching: boolean;
    public distance?: number;

    constructor(public position: PointInterface, public size: SizeInterface, public car: Car, public linkedBarrier?: Barrier) {
        super(position);
        this.colors = {
            yellow: '#ffd166',
            blue: '#669bbc',
            red: '#c1121f',
            orange: '#ff9f1c',
        };

        this.touched = false;
        this.touching = false;
    }

    update() {
        this.distance = distance({ x: this.position.x, y: this.position.y }, { x: this.car.position.x, y: this.car.position.y });

        if (this.distance <= this.size.w + 10) {
            if (this.linkedBarrier && this.linkedBarrier.touched) {
                this.touched = true;
            } else if (!this.linkedBarrier) {
                this.touched = true;
            }
        }

        this.distance <= this.size.w + 20 ? (this.touching = true) : (this.touching = false);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.translate(this.position.x, this.position.y);

        ctx.fillStyle = !this.touching ? this.colors.yellow : this.colors.orange;
        ctx.fillRect(0 - this.size.w / 2, 0 - this.size.h / 2, this.size.w, this.size.h);
        ctx.fillStyle = !this.touched ? this.colors.blue : this.colors.red;
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        ctx.font = '16px Consolas';
        ctx.fillStyle = '#000';
        ctx.fillText(`${this.distance?.toFixed(0)}`, -15, -15);
    }
}
