import { player1Controllers } from "./utils/keyboradMap";

import { GameManager } from "./actors/game_manager";

window.onload = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const gameManager = new GameManager(canvas);

    const { actors } = gameManager;

    let lastFrame = 0;
    const render = (time: number) => {
        let delta = (time - lastFrame) / 1000;
        lastFrame = time;

        actors.forEach((actor) => {
            actor.update(delta);
        });

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        actors.forEach((actor) => {
            ctx.save();
            actor.draw(ctx);
            ctx.restore();
        });

        window.requestAnimationFrame(render);
    };

    window.requestAnimationFrame(render);

    document.body.addEventListener("keydown", (event) => {
        const key = event.key;
        if (key in player1Controllers) {
            const playerKey = player1Controllers[key];
            gameManager.snake.keyboardEvent(playerKey);
        }
    });
};
