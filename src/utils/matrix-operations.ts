export function multiply(a, b): Transform {
    return [
        [ a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1], a[0][0] * b[0][2] + a[0][1] * b[1][2] + a[0][2] ],
        [ a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1], a[1][0] * b[0][2] + a[1][1] * b[1][2] + a[1][2] ]
    ]
}

export function move(x, y): Transform {
    return [
        [1, 0, x],
        [0, 1, y]
    ]
}

/**
 * Counter-clockwise rotation
 *
 * @param theta - Angle in radians
 */
export function rotate(theta): Transform {
    return [
        [Math.cos(theta), -Math.sin(theta), 0],
        [Math.sin(theta), Math.cos(theta), 0],
    ]
}