import { parseColor } from "./utils/color-parsing";
import { move, multiply, rotate } from "./utils/matrix-operations";

figma.showUI(__html__, {
  height: 480,
  width: 640,
});

figma.ui.onmessage = (msg) => {
  if (msg.type === "create-background") {
    const nodes: SceneNode[] = [];

    const rect = figma.createRectangle();

    const stripeOneColor = parseColor(msg.stripeOneColor);
    const stripeTwoColor = parseColor(msg.stripeTwoColor);

    var direction = (msg.angle * Math.PI) / 180;

    var stripeSize = 10;

    const SCALE = 0.5;

    var rectSize = 200;
    var actualSize = rectSize / SCALE;
    var stripeCount = actualSize / stripeSize;

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
            [SCALE, 0, 0],
            [0, SCALE, 0],
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
