export function getTextColor(hex: string): '#FFFFFF' | '#000000' {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const toLum = (c: number) => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const L = 0.2126 * toLum(r) + 0.7152 * toLum(g) + 0.0722 * toLum(b);
  const contrastWhite = 1.05 / (L + 0.05);
  const contrastBlack = (L + 0.05) / 0.05;

  return contrastWhite >= contrastBlack ? '#FFFFFF' : '#000000';
}
