import { PointInterface } from "../interfaces/point";
import { SizeInterface } from "../interfaces/size";
import { Actor } from "./actor";
import { GameManager } from "./game_manager";

export class Apple extends Actor {
    private active: boolean;

    constructor(
        public position: PointInterface,
        public size: SizeInterface,
        public color: string = "green",
        public gameManager: GameManager
    ) {
        super(position);
        this.size = size;
        this.color = color;
        this.gameManager = gameManager;
        this.active = true;
    }

    update(delta: number) {
        // No es necesario realizar ninguna actualización en este método
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.active) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(
                this.position.x + this.size.w / 2,
                this.position.y + this.size.h / 2,
                this.size.w / 2,
                0,
                2 * Math.PI
            );
            ctx.closePath();
            ctx.fill();
        }
    }

    setActive() {
        this.active = false;
    }

    setPosition(newPosition: PointInterface) {
        // Establecer la nueva posición de la manzana
        this.position = newPosition;
        this.active = true;
    }
}
