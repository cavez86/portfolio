// Points evenly spaced on a circle around (0, 0): gear teeth, holes, bolts, scale dots.
export const ring = (count: number, radius: number, phase = 0) =>
  Array.from({ length: count }, (_, i) => {
    const angle = phase + (i * 2 * Math.PI) / count;
    return { x: +(radius * Math.cos(angle)).toFixed(2), y: +(radius * Math.sin(angle)).toFixed(2) };
  });
