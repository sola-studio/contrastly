
// 3 or 6 digit HEX support (optional #)
export function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace(/^#/, '');
  if (h.length === 3)
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return [r, g, b];
}

function srgbToLinear(c: number) {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(r: number, g: number, b: number) {
  const R = srgbToLinear(r);
  const G = srgbToLinear(g);
  const B = srgbToLinear(b);
  // WCAG 2.0/2.1 constants
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

export function getContrastRatio(hex1: string, hex2: string) {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const l1 = relativeLuminance(r1, g1, b1);
  const l2 = relativeLuminance(r2, g2, b2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

export function formatContrastLikeWebAIM(input: number | string) {
  const toNum = (x: number | string) =>
    typeof x === 'number' ? x : parseFloat(String(x).split(':')[0]);

  const clamp = (v: number, lo = 1, hi = 21) => Math.min(hi, Math.max(lo, v));
  const r = clamp(toNum(input), 1, 21);

  const floored = Math.floor((r + 1e-10) * 100) / 100;
  let s = floored.toFixed(2); // "21.00" | "4.50" | "4.49"
  s = s.replace(/\.?0+$/, ''); // → "21" | "4.5" | "4.49"
  return `${s}:1`;
}
