import { SizeInterface } from "../interfaces/size";
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
        this.image.src = "background.jpeg";
        this.imagePositions = [0, 1, 2];
        this.currentImagePosition = 0;
        this.timer = 0;
    }

    draw(ctx: CanvasRenderingContext2D, size: PointInterface) {
        ctx.translate(this.position.x, this.position.y);

        // Ekans Image
        ctx.drawImage(
            this.image,
            0,
            0,
            this.size.w,
            this.size.h,
            this.position.x,
            this.position.y,
            this.size.w,
            this.size.h
        );

        ctx.translate(-this.position.x, -this.position.y);
    }
}
