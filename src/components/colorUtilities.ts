import chroma from 'chroma-js';

const shades = {
  main: 0,
  dark: -2,
  light: 1.25,
  lighter: 4,
};

export const initialColors = (numColors: number): string[] =>
  Array.from({ length: numColors }, (_, i) =>
    chroma.hsl((i * 360) / numColors, 0.85, 0.5).hex()
  );

export const generatePalette = (color: string[]) => {
  return color.map((c) => {
    const baseColor = chroma(c);
    const baseHSL = baseColor.hsl();
    return Object.fromEntries(
      Object.entries(shades).map(([shade, adjustment]) => {
        if (shade === 'main') {
          return [shade, baseColor.hex()];
        }
        const [h, s, l] = baseHSL;
        return [shade, chroma.hsl(h, s * 0.85, l + adjustment * 0.1).hex()];
      })
    );
  });
};
