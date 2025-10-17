import { state } from './state.js';
import { seedNoise, initLife } from './matrix.js';

const brightness = document.getElementById('brightness');
const brightnessLabel = document.getElementById('brightnessLabel');
const speed = document.getElementById('speed');
const speedLabel = document.getElementById('speedLabel');
const dirBtn = document.getElementById('dirBtn');
const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');
const ringPattern = document.getElementById('ringPattern');
const palette = document.getElementById('palette');
const baseColor = document.getElementById('baseColor');
const triangle = document.getElementById('triangle');
const matrixPattern = document.getElementById('matrixPattern');
const scrollText = document.getElementById('scrollText');
const randomizeBtn = document.getElementById('randomizeBtn');
const resetLife = document.getElementById('resetLife');
const ringCanvas = document.getElementById('ringCanvas');

function refreshLabels(){
  brightnessLabel.textContent = `(${brightness.value}%)`;
  speedLabel.textContent = `(${speed.value}°/ש׳)`;
}

export function initUI() {
  brightness.addEventListener('input', ()=>{ state.brightness = brightness.value/100; refreshLabels(); });
  speed.addEventListener('input', ()=>{ state.speed = Number(speed.value); refreshLabels(); });
  dirBtn.addEventListener('click', ()=>{ state.dir*=-1; dirBtn.textContent = state.dir>0? 'ימין':'שמאל'; });
  playBtn.addEventListener('click', ()=> state.running = true);
  stopBtn.addEventListener('click', ()=> state.running = false);
  ringPattern.addEventListener('change', ()=> state.ring.pattern = ringPattern.value);
  palette.addEventListener('change', ()=> state.ring.palette = palette.value);
  baseColor.addEventListener('input', ()=> state.ring.baseColor = baseColor.value);
  triangle.addEventListener('change', ()=> state.ring.triangle = triangle.checked);
  matrixPattern.addEventListener('change', ()=> state.matrix.pattern = matrixPattern.value);
  randomizeBtn.addEventListener('click', ()=>{ seedNoise(); initLife(); });
  resetLife.addEventListener('click', ()=> initLife(true));
  refreshLabels();
  triangle.checked = state.ring.triangle;

  // Touch: swipe to change speed / direction on ring
  (function(){
    let active=false, sx=0, sy=0;
    ringCanvas.addEventListener('pointerdown', e=>{ active=true; sx=e.clientX; sy=e.clientY; ringCanvas.setPointerCapture(e.pointerId); });
    ringCanvas.addEventListener('pointermove', e=>{
      if(!active) return; const dx=e.clientX-sx; const dy=e.clientY-sy; if(Math.abs(dx)>20){ state.dir = dx>0? 1:-1; }
      const spd = clamp(Math.abs(dx)+Math.abs(dy), 0, 400); state.speed = spd; speed.value = String(Math.round(spd)); refreshLabels();
    });
    ringCanvas.addEventListener('pointerup', ()=>{ active=false; });
    ringCanvas.addEventListener('pointercancel', ()=>{ active=false; });
  })();
}

// Mobile nav toggle
const btn = document.getElementById('navToggle');
const nav = document.getElementById('siteNav');
if (btn && nav) btn.addEventListener('click', ()=> nav.classList.toggle('hidden'));

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));