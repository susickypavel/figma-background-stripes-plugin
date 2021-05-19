figma.showUI(__html__);

function multiply(a, b): Transform {
  return [
    [ a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1], a[0][0] * b[0][2] + a[0][1] * b[1][2] + a[0][2] ],
    [ a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1] + 0, a[1][0] * b[0][2] + a[1][1] * b[1][2] + a[1][2] ]
  ]
}

function move(x, y): Transform {
  return [
    [1, 0, x],
    [0, 1, y]
  ]
}

function rotate(theta): Transform {
  return [
    [Math.cos(theta), -Math.sin(theta), 0],
    [Math.sin(theta), Math.cos(theta), 0],
  ]
}

figma.ui.onmessage = (msg) => {
  if (msg.type === "create-background") {
    const nodes: SceneNode[] = [];

    const rect = figma.createRectangle();

    const red = {
        a : 1,
        r: 1,
        g: 0,
        b: 0,
    }

    const green = {
      a : 1,
      r: 0,
      g: 1,
      b: 0,
    }

    var direction = msg.angle * Math.PI / 180;

    var stripeSize = 10;

    var scale = 0.5;

    var rectSize = 200;
    var test = rectSize / scale;
    var stripeCount = test / stripeSize;

    const stops = []

    rect.resize(parseFloat(msg.width), parseFloat(msg.height));

    for (let i = 0; i < stripeCount; i++) {
      const position = i / stripeCount;

      stops.push({
        color: i % 2 == 0 ? red : green,
        position,
      })

      stops.push({
        color: i % 2 == 0 ? green : red,
        position
      })
    }

    rect.fills = [
      {
        type: "GRADIENT_LINEAR",
        gradientTransform:
          multiply(
            multiply(
              multiply(
                move(0.5, 0.5),
                rotate(direction)
              ),
              move(-0.5, -0.5)
            ),
            [[0.5, 0, 0], [0, 0.5, 0]],
          ),
        gradientStops: stops
      }
    ]

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  figma.closePlugin();
};
