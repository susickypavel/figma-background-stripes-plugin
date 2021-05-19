figma.showUI(__html__);
function multiply(a, b) {
    return [
        [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1], a[0][0] * b[0][2] + a[0][1] * b[1][2] + a[0][2]],
        [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1] + 0, a[1][0] * b[0][2] + a[1][1] * b[1][2] + a[1][2]]
    ];
}
// Creates a "move" transform.
function move(x, y) {
    return [
        [1, 0, x],
        [0, 1, y]
    ];
}
// Creates a "rotate" transform.
function rotate(theta) {
    return [
        [Math.cos(theta), -Math.sin(theta), 0],
        [Math.sin(theta), Math.cos(theta), 0],
    ];
}
figma.ui.onmessage = (msg) => {
    if (msg.type === "create-background") {
        const nodes = [];
        const rect = figma.createRectangle();
        const red = {
            a: 1,
            r: 1,
            g: 0,
            b: 0,
        };
        const green = {
            a: 1,
            r: 0,
            g: 1,
            b: 0,
        };
        var direction = msg.angle * Math.PI / 180;
        var stripeSize = 10;
        var scale = 0.5;
        var rectSize = 200;
        var test = rectSize / scale;
        var stripeCount = test / stripeSize;
        const stops = [
        // {
        //   color: green,
        //   position: 0,
        // },
        // {
        //   color: red,
        //   position: 1,
        // }
        ];
        rect.resize(parseFloat(msg.width), parseFloat(msg.height));
        for (let i = 0; i < stripeCount; i++) {
            const position = i / stripeCount;
            stops.push({
                color: i % 2 == 0 ? red : green,
                position,
            });
            stops.push({
                color: i % 2 == 0 ? green : red,
                position
            });
        }
        var t = Math.sqrt(Math.pow(200, 2) + Math.pow(200, 2));
        var c = (200 * Math.cos(direction)) / 200;
        console.log("Delka: ", c);
        console.log("Delka: ", (200 * Math.cos(direction)));
        rect.fills = [
            {
                type: "GRADIENT_LINEAR",
                gradientTransform: multiply(multiply(multiply(move(0.5, 0.5), rotate(direction)), move(-0.5, -0.5)), [[0.5, 0, 0], [0, 0.5, 0]]),
                // gradientTransform: multiply(multiply(move(0.5, 0.5), rotate(direction)), [[-c, 0, 0], [0, -c, 0]]),
                gradientStops: stops
            }
        ];
        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);
    }
    figma.closePlugin();
};
