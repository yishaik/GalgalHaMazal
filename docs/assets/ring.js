import { state } from './state.js';
import { hsvToRgb, hexToRgb, rgbToCss, paletteColor } from './utils.js';

const ringCanvas = document.getElementById('ringCanvas');
const ringCtx = ringCanvas.getContext('2d');
const angleReadout = document.getElementById('angleReadout');
const hallAEl = document.getElementById('hallA');
const hallBEl = document.getElementById('hallB');
const ringSegmentsLabel = document.getElementById('ringSegmentsLabel');

// Fire effect
const firePalette = [];
for (let i = 0; i < 256; i++) {
  const t = i / 255;
  const r = Math.min(255, t * 255 * 1.5);
  const g = Math.min(255, t * 255 * 1.2);
  const b = Math.min(255, t * 255 * 0.8);
  firePalette.push([r, g, b]);
}

let firePixels = [];
export function initFire() {
  const N = state.ring.segments;
  firePixels = new Array(N).fill(0);
}


export function stepFire() {
  const N = state.ring.segments;
  for (let i = 0; i < N / 2; i++) {
    firePixels[Math.floor(Math.random() * N)] = 255;
  }
  for (let i = 0; i < N; i++) {
    const decay = Math.random() * 2.5;
    firePixels[i] = Math.max(0, firePixels[i] - decay);
  }
}

export function drawRing(){
  const {w,h,dpr} = fitCanvas(ringCanvas);
  const ctx = ringCtx; ctx.clearRect(0,0,w,h);
  const cx=w/2, cy=h/2; const R = Math.min(w,h)*0.36; const thickness = R*0.28; const seg = state.ring.segments;
  ringSegmentsLabel.textContent = String(seg);
  const bright = state.brightness;
  // Sensors at 0 and 180 degrees
  const a0 = ((state.ring.angle%360)+360)%360; // [0..360)
  const sensorA = (a0>358 || a0<2) ? 1:0; // near 0°
  const sensorB = (Math.abs(a0-180)<2) ? 1:0;
  hallAEl.textContent = sensorA; hallBEl.textContent = sensorB; angleReadout.textContent = a0.toFixed(0);

  const startAngle = -Math.PI/2; // top
  const per = 2*Math.PI/seg;
  for(let i=0;i<seg;i++){
    let color;
    switch(state.ring.pattern){
      case 'solid': color = hexToRgb(state.ring.baseColor); break;
      case 'chase': {
        const phase = (i*8 + a0*2)%360; const on = phase<60; color = on? paletteColor(i, seg, state.ring.palette): [30,30,30];
        break;
      }
      case 'larson': {
        const head = (a0/360)*seg; const d = Math.abs(i-head); const t = Math.max(0, 1 - d/8);
        const [r,g,b]=paletteColor(i, seg, state.ring.palette); color=[r*t,g*t,b*t];
        break;
      }
      case 'wipe': {
        const threshold = (a0/360)*seg; const on = i<threshold; color = on? paletteColor(i, seg, state.ring.palette): [10,10,10];
        break;
      }
      case 'fire': {
        const fireIndex = Math.floor(firePixels[i]);
        color = firePalette[fireIndex] || [0, 0, 0];
        break;
      }
      case 'rainbow':
      default:
        const idx = (i + Math.floor((a0/360)*seg))%seg; color = paletteColor(idx, seg, state.ring.palette); break;
    }
    // Apply brightness
    color = color.map(c=> c*bright);
    const a1 = startAngle + i*per;
    ctx.beginPath();
    ctx.strokeStyle = rgbToCss(color);
    ctx.lineWidth = thickness;
    ctx.arc(cx, cy, R, a1+0.02, a1+per-0.02);
    ctx.stroke();
  }

  // Triangle indicator at top when enabled
  if (state.ring.triangle){
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((state.ring.angle-90)*Math.PI/180);
    ctx.fillStyle = 'rgba(255,200,0,0.85)';
    const triR = R - thickness*0.65;
    ctx.beginPath();
    ctx.moveTo(triR, 0);
    ctx.lineTo(triR+18*dpr, 10*dpr);
    ctx.lineTo(triR+18*dpr, -10*dpr);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

function fitCanvas(canvas){
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const w = Math.max(200, Math.floor(rect.width * dpr));
  const h = Math.max(200, Math.floor(rect.height * dpr));
  if (canvas.width !== w || canvas.height !== h){ canvas.width=w; canvas.height=h; }
  return {w,h,dpr};
}