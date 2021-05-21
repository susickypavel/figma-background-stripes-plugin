import parse from "color-rgba";

/**
 * @param color - Color in any format
 * @returns r, g, b, a values mapped between 0 - 1
 */
export function parseColor(color: string): RGBA {
  const [r, g, b, a] = parse(color);

  return {
    a: a,
    r: r / 255,
    g: g / 255,
    b: b / 255,
  };
}
