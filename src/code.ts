import { createBackground } from "./commands/create-background";

import type { CreateBackgroundData } from "./commands/create-background.d";

type MessageData = {
  type: "create-background";
} & CreateBackgroundData;

figma.showUI(__html__, {
  height: 480,
  width: 640,
});

figma.ui.onmessage = (msg: MessageData) => {
  switch (msg.type) {
    case "create-background":
      createBackground(msg);
      break;
    default:
      console.log("No such command has been found.");
      break;
  }

  figma.closePlugin();
};
