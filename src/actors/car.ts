import { KeyboardMap, PlayerKeys } from './../utils/keyboradMap';
import { SizeInterface } from '../interfaces/size';
import { checkLimits } from '../utils/checkLimits';
import { converAngleToRad } from '../utils/convertAngleToRad';
import { PointInterface } from './../interfaces/point.d';
import { Actor } from './actor';

export class Car extends Actor {
    public angle: number;
    public rotationSpeed: number;
    public initialPosition: PointInterface;
    public image: HTMLImageElement;

    constructor(
        public position: PointInterface,
        public size: SizeInterface,
        public acceleration: number,
        public speed: number,
        public keyboardMap: KeyboardMap
    ) {
        super(position);
        this.angle = 0;
        this.rotationSpeed = 0;
        this.initialPosition = position;
        this.image = new Image();
        this.image.src = 'src/assets/img/car.png';
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(converAngleToRad(this.angle));

        // Rotate the car image
        ctx.rotate(converAngleToRad(180));
        // Car Image
        ctx.drawImage(this.image, -this.size.w / 2, -this.size.h / 2, this.size.w, this.size.h);

        // Ekans different image
        // ctx.drawImage(this.image, 0, 50, 50, 50, -this.size.w / 2, -this.size.h / 2, this.size.w, this.size.w);
    }

    update(delta: number, size: PointInterface) {
        // Rotación
        this.angle += this.rotationSpeed * (delta * 100);
        this.rotationSpeed *= 0.98;

        // Velocidad más aceleración
        this.speed = this.speed * 0.98 + this.acceleration;

        // Nueva posición
        const newPosition: PointInterface = {
            x: this.position.x + Math.cos(converAngleToRad(this.angle)) * this.speed * delta,
            y: this.position.y + Math.sin(converAngleToRad(this.angle)) * this.speed * delta,
        };

        // Verificación si está dentro del canvas
        if (checkLimits(size, newPosition)) {
            this.position = newPosition;
        } else {
            this.speed = 0;
        }
    }

    keyboardEventDown(key: string) {
        let keyMapped = this.keyboardMap[key];
        // console.log(key);
        // console.log(keyMapped);
        // console.log(PlayerKeys.LEFT, PlayerKeys.RIGHT, PlayerKeys.UP, PlayerKeys.DOWN);
        if (keyMapped === PlayerKeys.LEFT) {
            this.speed === 0 ? (this.rotationSpeed = 0) : (this.rotationSpeed -= 2);
        }
        if (keyMapped === PlayerKeys.RIGHT) {
            this.speed === 0 ? (this.rotationSpeed = 0) : (this.rotationSpeed += 2);
        }
        if (keyMapped === PlayerKeys.UP) {
            this.acceleration = 4;
        }
        if (keyMapped === PlayerKeys.DOWN) {
            this.acceleration = -4;
        }
    }

    keyboardEventUp(key: string) {
        let keyMapped = this.keyboardMap[key];
        if (keyMapped === PlayerKeys.UP || keyMapped === PlayerKeys.DOWN) {
            this.acceleration = 0;
        }
    }

    restart() {
        this.position = this.initialPosition;
        this.angle = 0;
        this.rotationSpeed = 0;
        this.speed = 0;
        this.acceleration = 0;
    }
}
