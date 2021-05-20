import { move, multiply, rotate } from "./utils/matrix-operations";
import parse from "color-rgba";

figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
  if (msg.type === "create-background") {
    const nodes: SceneNode[] = [];

    let [r1, g1, b1, a1] = parse(msg.stripeOneColor);
    let [r2, g2, b2, a2] = parse(msg.stripeTwoColor);

    const rect = figma.createRectangle();

    const stripeOneColor = {
      a: a1,
      r: r1 / 255,
      g: g1 / 255,
      b: b1 / 255,
    };

    const stripeTwoColor = {
      a: a2,
      r: r2 / 255,
      g: g2 / 255,
      b: b2 / 255,
    };

    var direction = (msg.angle * Math.PI) / 180;

    var stripeSize = 10;

    var scale = 0.5;

    var rectSize = 200;
    var test = rectSize / scale;
    var stripeCount = test / stripeSize;

    const stops = [];

    rect.resize(parseFloat(msg.width), parseFloat(msg.height));

    for (let i = 0; i < stripeCount; i++) {
      const position = i / stripeCount;

      stops.push({
        color: i % 2 == 0 ? stripeOneColor : stripeTwoColor,
        position,
      });

      stops.push({
        color: i % 2 == 0 ? stripeTwoColor : stripeOneColor,
        position,
      });
    }

    rect.fills = [
      {
        type: "GRADIENT_LINEAR",
        gradientTransform: multiply(
          multiply(
            multiply(move(0.5, 0.5), rotate(direction)),
            move(-0.5, -0.5)
          ),
          [
            [0.5, 0, 0],
            [0, 0.5, 0],
          ]
        ),
        gradientStops: stops,
      },
    ];

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  figma.closePlugin();
};
