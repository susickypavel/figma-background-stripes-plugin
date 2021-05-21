import { parseColor } from "../utils/color-parsing";
import { move, multiply, rotate } from "../utils/matrix-operations";

import type { State } from "../components/form/form.reducer";

export function createBackground(data: State): void {
  const BACKGROUND_MULTIPLIER = 1.5;

  const seeThroughPlane = figma.createFrame();
  const background = figma.createRectangle();

  const nodes: SceneNode[] = [seeThroughPlane, background];

  const rectHeight = parseFloat(data.rectHeight);
  const rectWidth = parseFloat(data.rectWidth);

  const backgroundSize =
    Math.max(rectHeight, rectWidth) * BACKGROUND_MULTIPLIER;

  background.x = -(backgroundSize / 2) + rectWidth / 2;
  background.y = -(backgroundSize / 2) + rectHeight / 2;
  background.locked = true;

  background.resize(backgroundSize, backgroundSize);
  seeThroughPlane.resize(rectWidth, rectHeight);
  seeThroughPlane.fills = [];

  const stripeOneColor = parseColor(data.firstStripeColor);
  const stripeTwoColor = parseColor(data.secondStripeColor);

  const direction = (parseFloat(data.angle) * Math.PI) / 180;

  const stripeSize = parseFloat(data.stripeWidth);

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
