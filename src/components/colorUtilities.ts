import chroma from 'chroma-js';

/**
 * 色相調整値
 */
const shades = {
  main: 1,
  dark: -2,
  light: 1.25,
  lighter: 4,
};

/**
 * 初期色を生成します。
 * @param {number} numColors - 生成する色の数
 * @return {string[]} 生成した色のリスト（HEX形式）
 */
export const initialColors = (num, existingColors = []) => {
  const colors = [];
  const step = 360 / num; // Use a constant hue step
  const baseHue =
    existingColors.length > 0 ? chroma(existingColors[0]).get('hsl.h') : 0;

  for (let i = 0; i < num; i++) {
    colors.push(`hsl(${(baseHue + i * step) % 360}, 80%, 45%)`);
  }

  // Remove already existing colors
  return colors.filter((color) => !existingColors.includes(color));
};

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
