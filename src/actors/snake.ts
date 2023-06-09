import { PointInterface } from "../interfaces/point";
import { SizeInterface } from "../interfaces/size";
import { Actor } from "./actor";
import { PlayerKeys } from "../utils/keyboradMap";
import { ScoreViewer } from "./score";
import { GameManager } from "./game_manager";

export class Snake extends Actor {
    public speed: PointInterface;
    public direction: string;
    public body: PointInterface[];
    public bodyLength: number;
    public delta1: number;
    public score: number;

    constructor(
        public position: PointInterface,
        public size: SizeInterface,
        public color: string = "#ffd60a",
        public maxSpeed: number = 10,
        public gameManager: GameManager,
        public scoreViewer: ScoreViewer
    ) {
        super(position);
        this.speed = { x: maxSpeed, y: 0 };
        this.direction = "right";
        this.bodyLength = 3;
        this.body = this.generateInitialBody();
        this.delta1 = 0;
        this.score = 0;
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
        ctx.fillStyle = this.color;
        ctx.fillRect(
            this.position.x,
            this.position.y,
            this.size.w,
            this.size.h
        );

        // Dibujar el cuerpo de la serpiente
        for (const segment of this.body) {
            ctx.fillStyle = this.color;
            ctx.fillRect(segment.x, segment.y, this.size.w, this.size.h);
        }
    }

    update(delta: number) {
        this.delta1 += delta;

        if (this.delta1 >= 0.25) {
            // Calcular la próxima posición de la cabeza de la serpiente
            const newPositionX = this.position.x + this.speed.x;
            const newPositionY = this.position.y + this.speed.y;

            // Verificar si la serpiente ha alcanzado los límites del mapa
            if (
                newPositionX < 0 ||
                newPositionX + this.size.w > this.gameManager.canvas.width ||
                newPositionY < 0 ||
                newPositionY + this.size.h > this.gameManager.canvas.height
            ) {
                // La serpiente ha alcanzado el límite del mapa, no realizar ningún movimiento

                this.delta1 = 0;
            } else {
                this.moveSnake(newPositionX, newPositionY); // Mover la serpiente

                this.delta1 -= 0.25; // Restar 0.25 al contador delta
            }
        }
    }

    increaseSize(points: number = 1) {
        // Aumentar el tamaño de la serpiente agregando un segmento a su cuerpo
        const lastSegment = this.body[this.body.length - 1];
        this.body.push(lastSegment);

        // Reiniciar la dirección de la serpiente
        this.direction = "right";

        // Incrementar el puntaje en 1
        this.score += points;
        this.scoreViewer.updateScore();
    }

    moveSnake(newPositionX: number, newPositionY: number) {
        // Mueve el cuerpo de la serpiente
        const newBody: PointInterface[] = [];

        // Agrega la nueva posición de la cabeza al principio del cuerpo

        newBody.unshift({ x: newPositionX, y: newPositionY });

        // Copia las posiciones anteriores del cuerpo a las nuevas posiciones
        for (let i = 1; i < this.body.length; i++) {
            newBody.push(this.body[i - 1]);
        }

        this.body = newBody; // Actualiza el cuerpo de la serpiente

        // Actualiza la posición de la cabeza de la serpiente
        this.position.x = newPositionX;
        this.position.y = newPositionY;

        // Verificar si la serpiente colisiona consigo misma
        if (this.checkSelfCollision()) {
            // La serpiente ha colisionado consigo misma, puedes tomar alguna acción aquí, como detener el juego o reiniciar la posición de la serpiente
            this.gameManager.endGame(); // Ejemplo: detener el juego
        }
    }

    private checkSelfCollision(): boolean {
        for (let i = 1; i < this.body.length; i++) {
            if (
                this.position.x === this.body[i].x &&
                this.position.y === this.body[i].y
            ) {
                return true;
            }
        }
        return false;
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
