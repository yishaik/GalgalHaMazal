import { state } from './state.js';
import { initUI } from './ui.js';
import { drawRing, stepFire, initFire } from './ring.js';
import { drawMatrix, stepStarfield, initStarfield, initLife, seedNoise } from './matrix.js';

const fpsEl = document.getElementById('fps');

let last = performance.now();
let frames = 0;
let fpsTime = performance.now();

function loop(now) {
  requestAnimationFrame(loop);
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;

  if (state.running) {
    state.ring.angle = (state.ring.angle + state.dir * state.speed * dt) % 360;
    stepFire();
    stepStarfield();
  }

  drawRing();
  drawMatrix(dt);

  frames++;
  if (now - fpsTime > 500) {
    fpsEl.textContent = Math.round(frames * 1000 / (now - fpsTime));
    fpsTime = now;
    frames = 0;
  }
}

initUI();
initFire();
initStarfield();
seedNoise();
initLife();
requestAnimationFrame(loop);