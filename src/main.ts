import { PointInterface } from './interfaces/point.d';
import { Actor } from './actors/actor';
import { FPSViewer } from './actors/fps_viewer';
import { Music } from './actors/music';
import { Timer } from './actors/timer';
import { Snake } from './actors/snake';
import { KeyboardMap, player1Controllers, player2Controllers } from './utils/keyboradMap';
import { Ekans } from './actors/ekans';


// Ejecuta el código dentro de la función "onload" en este archivo "main.js" hasta que haya cargado primero el DOM
window.onload = () => {
  // Obtener "canvas" con el DOM
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  // Mitad del canvas
  const canvasSize: PointInterface = { x: canvas.width, y: canvas.height };

  // Instancias de actores
  const fps = new FPSViewer();
  const score = new Timer();
  const music = new Music();
  const snake = new Snake({ x: 50, y: canvas.height / 2 }, { w: 20, h: 20 }, 'red', 20);
  const backgroundImage = new Ekans();

  // Array de actores
  let actors: Actor[] = [backgroundImage,music, fps, score, snake];

  // Renderizado
  let lastFrame = 0;
  const render = (time: number) => {
    // Cálculo entre frames
    let delta = (time - lastFrame) / 1000;
    lastFrame = time;

    // Actualizado de cada actor
    actors.forEach((actor) => {
      actor.update(delta, canvasSize);
    });

    // Limpiar todo lo dibujado en el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujado de cada actor
    actors.forEach((actor) => {
      ctx.save();
      actor.draw(ctx, canvasSize, delta);
      ctx.restore();
    });

    // Recursividad
    window.requestAnimationFrame(render);
  };

  // Primer llamado del renderizado
  window.requestAnimationFrame(render);

  // Eventos
  document.body.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key in player1Controllers) {
      const playerKey = player1Controllers[key];
      snake.keyboardEvent(playerKey);
    }
  });
  
}