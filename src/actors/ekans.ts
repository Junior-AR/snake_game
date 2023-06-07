import { SizeInterface } from "./../interfaces/size.d";
import { PointInterface } from "../interfaces/point";
import { Actor } from "./actor";

export class Ekans extends Actor {
    public initialPosition: PointInterface;
    public image: HTMLImageElement;
    public imagePositions: number[];
    public currentImagePosition: number;
    public timer: number;

    constructor(
        public position: PointInterface = { x: 0, y: 0 },
        public size: SizeInterface = { w: 40, h: 40 }
    ) {
        super(position);
        this.initialPosition = position;
        this.image = new Image();
        this.image.src = "src/assets/img/snake1.jpg";
        this.imagePositions = [0, 1, 2];
        this.currentImagePosition = 0;
        this.timer = 0;
    }

    draw(ctx: CanvasRenderingContext2D, size: PointInterface) {
        ctx.translate(this.position.x, this.position.y);

        // Ekans Image
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            size.x,
            size.y
        );
    }
}
