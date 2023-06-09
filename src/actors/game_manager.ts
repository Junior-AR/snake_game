import { PointInterface } from "../interfaces/point";
import { Actor } from "./actor";
import { Apple } from "./apple";
import { ScoreViewer } from "./score";
import { Snake } from "./snake";
import { Music } from "./music";
import { Ekans } from "./ekans";
import { FPSViewer } from "./fps_viewer";
import { Timer } from "./timer";

export class GameManager {
    public actors: Actor[];
    public apple: Apple;
    public scoreViewer: ScoreViewer;
    public snake: Snake;
    public ekans: Ekans;
    public music: Music;
    public fpsViewer: FPSViewer;
    public timer: Timer;
    private lastTimestamp: number;

    constructor(public canvas: HTMLCanvasElement) {
        this.canvas.style.backgroundImage = 'url("src/assets/img/SNAKE.jpeg")'; // Establecer la imagen como fondo del canvas

        this.ekans = new Ekans();
        this.ekans.image.onload = () => {
            this.start();
        };
        this.timer = new Timer();
        this.scoreViewer = new ScoreViewer();
        this.fpsViewer = new FPSViewer();
        this.music = new Music();
        this.snake = new Snake(
            { x: 40, y: 240 },
            { w: 20, h: 20 },
            "red",
            20,
            this,
            this.scoreViewer
        );

        this.apple = new Apple(
            this.generateRandomPosition(this.canvas),
            { w: 20, h: 20 },
            "blue",
            this
        );

        this.actors = [
            this.ekans,
            this.snake,
            this.apple,
            this.scoreViewer,
            this.fpsViewer,
            this.timer,
        ];
        this.lastTimestamp = 0;

        this.start();
    }

    generateNewApplePosition() {
        let newPosition = this.generateRandomPosition(this.canvas);

        // Verificar si la nueva posición se superpone con el cuerpo de la serpiente
        while (this.isCollisionWithSnake(newPosition)) {
            newPosition = this.generateRandomPosition(this.canvas);
        }

        this.apple.setPosition(newPosition);
        this.increaseScore();
    }

    isCollisionWithSnake(position: PointInterface): boolean {
        // Verificar si la posición se superpone con cualquier segmento del cuerpo de la serpiente
        for (const segment of this.snake.body) {
            if (segment.x === position.x && segment.y === position.y) {
                return true;
            }
        }
        return false;
    }

    generateRandomPosition(canvas: HTMLCanvasElement): PointInterface {
        const randomX = Math.floor(Math.random() * (canvas.width - 20));
        const randomY = Math.floor(Math.random() * (canvas.height - 20));
        const x = Math.ceil(randomX / 20) * 20;
        const y = Math.ceil(randomY / 20) * 20;

        return { x, y };
    }

    private checkCollision() {
        const snakeHead = this.snake.position;
        const applePosition = this.apple.position;
        const snakeSize = this.snake.size;

        const collisionX =
            Math.abs(snakeHead.x - applePosition.x) <= snakeSize.w / 2;
        const collisionY =
            Math.abs(snakeHead.y - applePosition.y) <= snakeSize.h / 2;

        if (collisionX && collisionY) {
            this.snake.increaseSize();
            this.generateNewApplePosition();
        }
    }

    private update(timestamp: number) {
        if (!this.lastTimestamp) {
            this.lastTimestamp = timestamp;
        }

        const delta = (timestamp - this.lastTimestamp) / 1000; // Calcular el delta en segundos
        this.lastTimestamp = timestamp;

        this.snake.update(delta);
        this.fpsViewer.update(delta); // Agregar esta línea
        this.timer.update(delta); // Agregar esta línea

        this.actors.forEach((actor) => {
            actor.update(delta);
        });

        this.checkCollision();

        // Solicitar el próximo frame de animación
        requestAnimationFrame((timestamp) => this.update(timestamp));
    }

    start() {
        // Solicitar el primer frame de animación
        requestAnimationFrame((timestamp) => this.update(timestamp));
    }

    endGame() {
        // Aquí puedes implementar la lógica para finalizar el juego
        console.log("Game over");
    }

    increaseScore() {
        // Aquí puedes implementar la lógica para aumentar la puntuación del juego
        console.log("Score increased");
    }
}
