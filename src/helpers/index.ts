// src/helpers/index.ts
import { hexToRgb, relativeLuminance } from './contrasts';

export function getTextColor(hex: string): '#FFFFFF' | '#000000' {
  const [r, g, b] = hexToRgb(hex);
  const luminance = relativeLuminance(r, g, b);

  const contrastWithWhite = 1.05 / (luminance + 0.05);
  const contrastWithBlack = (luminance + 0.05) / 0.05;

  return contrastWithWhite >= contrastWithBlack ? '#FFFFFF' : '#000000';
}
