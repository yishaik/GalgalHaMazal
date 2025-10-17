export const state = {
  running: true,
  dir: 1,
  brightness: 0.8,
  speed: 60, // deg/sec
  ring: {
    segments: 160,
    segmentSize: 16,
    showSegments: true,
    pattern: 'rainbow',
    baseColor: '#ff5500',
    palette: 'rainbow',
    angle: 0,
    triangle: true
  },
  matrix: { size: 32, pattern: 'noise', tick: 0, textOffset: 0, life:null }
};
