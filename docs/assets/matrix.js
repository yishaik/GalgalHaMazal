import { state } from './state.js';
import { hsvToRgb, hexToRgb, rgbToCss } from './utils.js';

const matrixCanvas = document.getElementById('matrixCanvas');
const matrixCtx = matrixCanvas.getContext('2d');
const scrollText = document.getElementById('scrollText');

let noiseSeed = 1;
export function seedNoise(){ noiseSeed = (Date.now() % 2147483647); }
function rand(){ noiseSeed = (noiseSeed*48271)%2147483647; return noiseSeed/2147483647; }

// Game of Life
export function initLife(clear){
  const N = state.matrix.size;
  const grid = Array.from({length:N}, ()=> Array.from({length:N}, ()=> clear?0: (rand()>0.7?1:0)) );
  state.matrix.life = grid;
}
function stepLife(){
  const N = state.matrix.size; const g = state.matrix.life; if(!g) return;
  const out = Array.from({length:N}, ()=> Array.from({length:N}, ()=>0));
  const nb = (x,y)=>{
    let s=0; for(let dy=-1;dy<=1;dy++) for(let dx=-1;dx<=1;dx++){ if(dx||dy){ const xx=(x+dx+N)%N, yy=(y+dy+N)%N; s+=g[yy][xx]; } } return s;
  };
  for(let y=0;y<N;y++) for(let x=0;x<N;x++){
    const n=nb(x,y); const alive=g[y][x];
    out[y][x] = (alive && (n===2||n===3)) || (!alive && n===3) ? 1:0;
  }
  state.matrix.life = out;
}

// Starfield effect
let stars = [];
export function initStarfield() {
  const N = state.matrix.size;
  stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: Math.random() * N,
      y: Math.random() * N,
      z: Math.random() * N,
    });
  }
}
export function stepStarfield() {
  const N = state.matrix.size;
  stars.forEach(star => {
    star.z -= 0.1;
    if (star.z <= 0) {
      star.x = Math.random() * N;
      star.y = Math.random() * N;
      star.z = N;
    }
  });
}

export function drawMatrix(dt){
  const {w,h} = fitCanvas(matrixCanvas);
  const ctx = matrixCtx; ctx.clearRect(0,0,w,h);
  const N = state.matrix.size; const pad = Math.floor(Math.min(w,h)*0.04); const size = Math.min(w,h)-pad*2;
  const cell = size / N; const ox = (w-size)/2; const oy = (h-size)/2;
  const bright = state.brightness;

  // build frame pixels
  const pixels = [];
  if (state.matrix.pattern==='noise'){
    for(let y=0;y<N;y++){
      for(let x=0;x<N;x++){
        const v = rand(); const c = [v*255, (1-v)*255, 200*(0.5+0.5*v)];
        pixels.push(c);
      }
    }
  } else if (state.matrix.pattern === 'starfield') {
    const imageData = new Array(N * N).fill(0);
    stars.forEach(star => {
      const sx = (star.x / star.z) * N/2 + N/2;
      const sy = (star.y / star.z) * N/2 + N/2;
      if (sx >= 0 && sx < N && sy >= 0 && sy < N) {
        const index = Math.floor(sy) * N + Math.floor(sx);
        const brightness = (1 - star.z / N) * 255;
        pixels[index] = [brightness, brightness, brightness];
      }
    });
  } else if (state.matrix.pattern==='plasma'){
    state.matrix.tick += dt;
    for(let y=0;y<N;y++){
      for(let x=0;x<N;x++){
        const v = 0.5 + 0.5*Math.sin(x*0.3 + state.matrix.tick*2) * Math.cos(y*0.3 + state.matrix.tick*1.3);
        const [r,g,b] = hsvToRgb(360*v, 1, 1);
        pixels.push([r*255*bright,g*255*bright,b*255*bright]);
      }
    }
  } else if (state.matrix.pattern==='life'){
    if (state.running) stepLife();
    for(let y=0;y<N;y++) for(let x=0;x<N;x++) pixels.push(state.matrix.life[y][x] ? [80,255,120]: [10,20,12]);
  } else if (state.matrix.pattern==='scroll'){
    // Simple scrolling mono text using canvas measurement
    state.matrix.textOffset = (state.matrix.textOffset - (state.running? 60*dt:0)) || 0;
    const tex = scrollText.value || 'GALGAL HAMAZAL';
    // Draw temp onto offscreen and sample
    const c2 = document.createElement('canvas'); const s2 = c2.getContext('2d');
    c2.width = N*2; c2.height = N*2; s2.clearRect(0,0,c2.width,c2.height);
    s2.fillStyle = '#fff'; s2.font = `${N}px sans-serif`;
    s2.textBaseline='top'; s2.fillText(tex, state.matrix.textOffset%(N*2), 0);
    const img = s2.getImageData(0,0,c2.width,c2.height).data;
    for(let y=0;y<N;y++){
      for(let x=0;x<N;x++){
        const ix = (y*2*c2.width + x*2)*4; const on = img[ix+3] > 10;
        pixels.push(on? [255,255,255]: [5,5,5]);
      }
    }
  } else if (state.matrix.pattern==='solid'){
    const [r,g,b] = hexToRgb(state.ring.baseColor);
    for(let i=0;i<N*N;i++) pixels.push([r*bright,g*bright,b*bright]);
  }

  // draw pixels
  let k=0;
  for(let y=0;y<N;y++){
    for(let x=0;x<N;x++){
      const [r,g,b] = pixels[k++] || [0,0,0];
      ctx.fillStyle = rgbToCss([r*bright,g*bright,b*bright]);
      ctx.fillRect(ox + x*cell + 1, oy + y*cell + 1, Math.max(1, cell-2), Math.max(1, cell-2));
    }
  }
  // bezel
  ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.strokeRect(ox, oy, size, size);
}

function fitCanvas(canvas){
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const w = Math.max(200, Math.floor(rect.width * dpr));
  const h = Math.max(200, Math.floor(rect.height * dpr));
  if (canvas.width !== w || canvas.height !== h){ canvas.width=w; canvas.height=h; }
  return {w,h,dpr};
}