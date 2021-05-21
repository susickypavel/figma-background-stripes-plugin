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

    const rectHeight = parseFloat(msg.height);
    const rectWidth = parseFloat(msg.width);

    rect.resize(rectWidth, rectHeight);

    const stripeOneColor = parseColor(msg.stripeOneColor);
    const stripeTwoColor = parseColor(msg.stripeTwoColor);

    const direction = (msg.angle * Math.PI) / 180;
    const stripeSize = parseFloat(msg.stripeWidth);

    const SCALE = 0.5;

    const rectSize = 200;
    const actualSize = rectSize / SCALE;
    const stripeCount = actualSize / stripeSize;

    const stops = [];

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
