import { parseColor } from "./utils/color-parsing";
import { move, multiply, rotate } from "./utils/matrix-operations";

figma.showUI(__html__, {
  height: 480,
  width: 640,
});

figma.ui.onmessage = (msg) => {
  if (msg.type === "create-background") {
    const BACKGROUND_MULTIPLIER = 2;

    const nodes: SceneNode[] = [];

    const seeThroughPlane = figma.createFrame();
    const background = figma.createRectangle();

    const rectHeight = parseFloat(msg.height);
    const rectWidth = parseFloat(msg.width);

    const backgroundSize =
      Math.max(rectHeight, rectWidth) * BACKGROUND_MULTIPLIER;

    background.resize(backgroundSize, backgroundSize);
    seeThroughPlane.resize(rectWidth, rectHeight);
    seeThroughPlane.fills = [];

    const stripeOneColor = parseColor(msg.stripeOneColor);
    const stripeTwoColor = parseColor(msg.stripeTwoColor);

    const direction = (parseFloat(msg.angle) * Math.PI) / 180;

    const stripeSize = parseFloat(msg.stripeWidth);

    const diagonal = Math.sqrt(
      Math.pow(backgroundSize, 2) + Math.pow(backgroundSize, 2)
    );

    const scale = backgroundSize / diagonal;

    const stripeCount = diagonal / stripeSize;

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

    background.fills = [
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

    seeThroughPlane.appendChild(background);

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  figma.closePlugin();
};
