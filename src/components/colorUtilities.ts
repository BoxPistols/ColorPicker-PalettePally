import chroma from 'chroma-js';

/**
 * 色相調整値
 */
const shades = {
  main: 0,
  dark: -2,
  light: 1.25,
  lighter: 4,
};

/**
 * 初期色を生成します。
 * @param {number} numColors - 生成する色の数
 * @return {string[]} 生成した色のリスト（HEX形式）
 */
export const initialColors = (numColors: number): string[] =>
  Array.from({ length: numColors }, (_, i) =>
    chroma.hsl((i * 360) / numColors, 0.88, 0.38).hex()
  );

/**
 * カラーパレットを生成します。
 * @param {string[]} color - ベースとなる色のリスト（HEX形式）
 * @return {any[]} 生成したカラーパレット
 */
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
