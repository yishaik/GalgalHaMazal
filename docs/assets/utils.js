export function hsvToRgb(h, s, v){
  let f = (n, k=(n+h/60)%6) => v - v*s*Math.max(Math.min(k,4-k,1),0);
  return [f(5), f(3), f(1)];
}

export function lerp(a,b,t){ return a + (b-a)*t }

export function hexToRgb(hex){
  const m = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})/i.exec(hex);
  if(!m) return [255,255,255];
  return [parseInt(m[1],16), parseInt(m[2],16), parseInt(m[3],16)];
}

export function rgbToCss([r,g,b], a=1){ return `rgba(${r|0},${g|0},${b|0},${a})` }

export function paletteColor(idx, total, name){
  if (name==='rainbow'){
    const h = 360*(idx/total);
    const [r,g,b] = hsvToRgb(h, 1, 1);
    return [r*255,g*255,b*255];
  } else if (name==='warm'){
    const t = idx/total; return [lerp(255,255,t), lerp(80,180,t), lerp(0,60,t)];
  } else if (name==='cool'){
    const t = idx/total; return [lerp(40,120,t), lerp(150,200,t), lerp(255,255,t)];
  } else if (name==='bw'){
    const g = 255*(idx/total); return [g,g,g];
  }
  return [255,255,255];
}