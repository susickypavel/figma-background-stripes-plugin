import { parseColor } from "./utils/color-parsing";
import { move, multiply, rotate } from "./utils/matrix-operations";

figma.showUI(__html__, {
  height: 480,
  width: 640,
});

figma.ui.onmessage = (msg) => {
  if (msg.type === "create-background") {
    const nodes: SceneNode[] = [];

    const frame = figma.createFrame();
    const rect = figma.createRectangle();

    const rectHeight = parseFloat(msg.height);
    const rectWidth = parseFloat(msg.width);

    const largestSide = Math.max(rectHeight, rectWidth);

    rect.resize(largestSide * 2, largestSide * 2);
    frame.resize(rectWidth, rectHeight);
    frame.fills = [];

    const stripeOneColor = parseColor(msg.stripeOneColor);
    const stripeTwoColor = parseColor(msg.stripeTwoColor);

    const direction = (parseFloat(msg.angle) * Math.PI) / 180;

    const stripeSize = parseFloat(msg.stripeWidth);

    const diagonal = Math.sqrt(
      Math.pow(largestSide * 2, 2) + Math.pow(largestSide * 2, 2)
    );

    const scale = (largestSide * 2) / diagonal;

    const stripeCount = (diagonal * 2) / stripeSize;

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
            multiply(
              [
                [scale, 0, 0],
                [0, scale, 0],
              ],
              move(scale, scale)
            ),
            rotate(direction)
          ),
          move(-0.5, -0.5)
        ),
        gradientStops: stops,
      },
    ];

    frame.appendChild(rect);

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  figma.closePlugin();
};
