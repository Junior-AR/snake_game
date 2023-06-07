import { PointInterface } from "../interfaces/point";
import { SizeInterface } from "../interfaces/size";
import { Actor } from "./actor";
import { PlayerKeys } from "../utils/keyboradMap";

export class Snake extends Actor {
    public speed: PointInterface;
    public direction: string;
    public body: PointInterface[];
    public bodyLength: number;
    public delta1: number;

    constructor(
        public position: PointInterface,
        public size: SizeInterface,
        public color: string = "#ffd60a",
        public maxSpeed: number = 10
    ) {
        super(position);
        this.speed = { x: maxSpeed, y: 0 };
        this.direction = "right";
        this.body = [position, position, position];
        this.bodyLength = 3;
        this.body = this.generateInitialBody();
        this.delta1 = 0;
    }
    private generateInitialBody(): PointInterface[] {
        const body: PointInterface[] = [];
        for (let i = 0; i < this.bodyLength; i++) {
            body.push({
                x: this.position.x - i * this.size.w,
                y: this.position.y,
            });
        }
        return body;
    }

    draw(ctx: CanvasRenderingContext2D) {
        // Dibujar la cabeza de la serpiente
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.fillRect(
            this.position.x,
            this.position.y,
            this.size.w,
            this.size.h
        );
        ctx.closePath();

        // Dibujar el cuerpo de la serpiente
        // for (const segment of this.body) {
        //     ctx.fillRect(segment.x, segment.y, this.size.w, this.size.h);
        // }
    }

    update(delta: number) {
        this.delta1 = this.delta1 + delta;
        let newPositionX = this.position.x + this.speed.x;
        let newPositionY = this.position.y + this.speed.y;
        if (Number(this.delta1.toFixed(2)) % 0.5 == 0) {
            this.position.x = newPositionX;
            this.position.y = newPositionY;
        }
        
        // Mueve el cuerpo de la serpiente
        // const newBody: PointInterface[] = [];
        //newBody.push({ x: newPositionX, y: newPositionY }); // Agrega la nueva posición de la cabeza al principio del cuerpo

        // Copia las posiciones anteriores del cuerpo a las nuevas posiciones
        // for (let i = 0; i < this.body.length - 1; i++) {
        //     newBody.push(this.body[i]);
        // }

        // this.body = newBody; // Actualiza el cuerpo de la serpiente
    }

    keyboardEvent(key: PlayerKeys) {
        switch (key) {
            case PlayerKeys.LEFT:
                if (this.direction !== "right") {
                    this.speed.x = -this.maxSpeed;
                    this.speed.y = 0;
                    this.direction = "left";
                }
                break;
            case PlayerKeys.RIGHT:
                if (this.direction !== "left") {
                    this.speed.x = this.maxSpeed;
                    this.speed.y = 0;
                    this.direction = "right";
                }
                break;
            case PlayerKeys.UP:
                if (this.direction !== "down") {
                    this.speed.y = -this.maxSpeed;
                    this.speed.x = 0;
                    this.direction = "up";
                }
                break;
            case PlayerKeys.DOWN:
                if (this.direction !== "up") {
                    this.speed.y = this.maxSpeed;
                    this.speed.x = 0;
                    this.direction = "down";
                }
                break;
        }
    }
}
