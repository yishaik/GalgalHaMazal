import { state } from './state.js';
import { seedNoise, initLife } from './matrix.js';
import { initFire } from './ring.js';

const brightness = document.getElementById('brightness');
const brightnessLabel = document.getElementById('brightnessLabel');
const speed = document.getElementById('speed');
const speedLabel = document.getElementById('speedLabel');
const segments = document.getElementById('segments');
const segmentsLabel = document.getElementById('segmentsSliderLabel');
const segmentSize = document.getElementById('segmentSize');
const segmentSizeLabel = document.getElementById('segmentSizeLabel');
const showSegments = document.getElementById('showSegments');
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
const statusRun = document.getElementById('statusRun');
const statusDir = document.getElementById('statusDir');
const statusSpeed = document.getElementById('statusSpeed');
const statusBrightness = document.getElementById('statusBrightness');
const statusSegments = document.getElementById('statusSegments');
const statusSegmentSize = document.getElementById('statusSegmentSize');

function refreshLabels(){
  brightnessLabel.textContent = `(${brightness.value}%)`;
  speedLabel.textContent = `(${speed.value}°/ש׳)`;
  if (segments && segmentsLabel) segmentsLabel.textContent = `(${state.ring.segments})`;
  if (segmentSize && segmentSizeLabel) segmentSizeLabel.textContent = `(${state.ring.segmentSize})`;
  renderStatus();
}

function renderStatus(){
  if (!statusRun) return;
  statusRun.textContent = `מצב: ${state.running ? 'פועל' : 'מושהה'}`;
  statusRun.dataset.state = state.running ? 'running' : 'paused';
  if (statusDir) statusDir.textContent = `כיוון: ${state.dir > 0 ? 'ימין' : 'שמאל'}`;
  if (statusSpeed) statusSpeed.textContent = `מהירות: ${Math.round(state.speed)}°/ש׳`;
  if (statusBrightness) statusBrightness.textContent = `בהירות: ${Math.round(state.brightness * 100)}%`;
  if (statusSegments) statusSegments.textContent = `נורות: ${state.ring.segments}`;
  if (statusSegmentSize) {
    const value = state.ring.segmentSize;
    statusSegmentSize.textContent = state.ring.showSegments ? `מקטע: ${value}` : `מקטע: מוסתר (${value})`;
  }
}

export function initUI() {
  brightness.addEventListener('input', ()=>{ state.brightness = brightness.value/100; refreshLabels(); });
  speed.addEventListener('input', ()=>{ state.speed = Number(speed.value); refreshLabels(); });
  if (segments){
    segments.addEventListener('input', ()=>{
      state.ring.segments = Number(segments.value);
      if (segmentSize){
        const clamped = Math.max(Number(segmentSize.min)||1, Math.min(state.ring.segmentSize, state.ring.segments));
        state.ring.segmentSize = clamped;
        segmentSize.value = String(clamped);
      }
      initFire();
      refreshLabels();
    });
  }
  if (segmentSize){
    segmentSize.addEventListener('input', ()=>{
      const value = Math.max(Number(segmentSize.min)||1, Math.min(Number(segmentSize.value), state.ring.segments));
      state.ring.segmentSize = value;
      segmentSize.value = String(value);
      refreshLabels();
    });
  }
  if (showSegments){
    showSegments.addEventListener('change', ()=>{
      state.ring.showSegments = showSegments.checked;
      refreshLabels();
    });
  }
  dirBtn.addEventListener('click', ()=>{ state.dir*=-1; dirBtn.textContent = state.dir>0? 'ימין':'שמאל'; renderStatus(); });
  playBtn.addEventListener('click', ()=>{ state.running = true; renderStatus(); });
  stopBtn.addEventListener('click', ()=>{ state.running = false; renderStatus(); });
  ringPattern.addEventListener('change', ()=> state.ring.pattern = ringPattern.value);
  palette.addEventListener('change', ()=> state.ring.palette = palette.value);
  baseColor.addEventListener('input', ()=> state.ring.baseColor = baseColor.value);
  triangle.addEventListener('change', ()=> state.ring.triangle = triangle.checked);
  matrixPattern.addEventListener('change', ()=> state.matrix.pattern = matrixPattern.value);
  randomizeBtn.addEventListener('click', ()=>{ seedNoise(); initLife(); });
  resetLife.addEventListener('click', ()=> initLife(true));
  triangle.checked = state.ring.triangle;
  if (segments){
    segments.value = String(state.ring.segments);
  }
  if (segmentSize){
    segmentSize.value = String(state.ring.segmentSize);
  }
  if (showSegments){
    showSegments.checked = state.ring.showSegments;
  }
  refreshLabels();

  // Touch: swipe to change speed / direction on ring
  (function(){
    let active=false, sx=0, sy=0;
    ringCanvas.addEventListener('pointerdown', e=>{ active=true; sx=e.clientX; sy=e.clientY; ringCanvas.setPointerCapture(e.pointerId); });
    ringCanvas.addEventListener('pointermove', e=>{
      if(!active) return; const dx=e.clientX-sx; const dy=e.clientY-sy; if(Math.abs(dx)>20){ state.dir = dx>0? 1:-1; }
      dirBtn.textContent = state.dir>0? 'ימין':'שמאל';
      const spd = clamp(Math.abs(dx)+Math.abs(dy), 0, 400); state.speed = spd; speed.value = String(Math.round(spd)); refreshLabels();
    });
    ringCanvas.addEventListener('pointerup', ()=>{ active=false; });
    ringCanvas.addEventListener('pointercancel', ()=>{ active=false; });
  })();

  document.addEventListener('keydown', e=>{
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable)){
      return;
    }
    if (e.key === ' '){
      e.preventDefault();
      state.running = !state.running;
      renderStatus();
    } else if (e.key === 'ArrowRight'){
      e.preventDefault();
      state.speed = clamp(state.speed + 10, 0, 400);
      speed.value = String(Math.round(state.speed));
      refreshLabels();
    } else if (e.key === 'ArrowLeft'){
      e.preventDefault();
      state.speed = clamp(state.speed - 10, 0, 400);
      speed.value = String(Math.round(state.speed));
      refreshLabels();
    } else if (e.key === 'ArrowDown'){
      e.preventDefault();
      state.dir *= -1;
      dirBtn.textContent = state.dir>0? 'ימין':'שמאל';
      renderStatus();
    }
  });

  renderStatus();
}

// Mobile nav toggle
const btn = document.getElementById('navToggle');
const nav = document.getElementById('siteNav');
if (btn && nav) btn.addEventListener('click', ()=> nav.classList.toggle('hidden'));

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));