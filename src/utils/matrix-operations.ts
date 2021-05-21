/**
 * @param a - 3x2 matrix
 * @param b - 3x2 matrix
 * @returns
 */
export function multiply(a: Transform, b: Transform): Transform {
  return [
    [
      a[0][0] * b[0][0] + a[0][1] * b[1][0],
      a[0][0] * b[0][1] + a[0][1] * b[1][1],
      a[0][0] * b[0][2] + a[0][1] * b[1][2] + a[0][2],
    ],
    [
      a[1][0] * b[0][0] + a[1][1] * b[1][0],
      a[1][0] * b[0][1] + a[1][1] * b[1][1],
      a[1][0] * b[0][2] + a[1][1] * b[1][2] + a[1][2],
    ],
  ];
}

export function move(x: number, y: number): Transform {
  return [
    [1, 0, x],
    [0, 1, y],
  ];
}

/**
 * Counter-clockwise rotation
 *
 * @param theta - Angle in radians
 */
export function rotate(theta: number): Transform {
  return [
    [Math.cos(theta), -Math.sin(theta), 0],
    [Math.sin(theta), Math.cos(theta), 0],
  ];
}
