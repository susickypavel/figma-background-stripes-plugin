// @ts-nocheck

import styles from "figma-plugin-ds/dist/figma-plugin-ds.css";

document.getElementById("create").onclick = () => {
  const stripeOneColor = document.getElementById("stripeOneColor").value;
  const stripeTwoColor = document.getElementById("stripeTwoColor").value;
  const angle = document.getElementById("angle").value;
  const height = document.getElementById("rectHeight").value;
  const width = document.getElementById("rectWidth").value;

  parent.postMessage(
    {
      pluginMessage: {
        type: "create-background",
        stripeOneColor,
        stripeTwoColor,
        angle,
        height,
        width,
      },
    },
    "*"
  );
};

document.getElementById("cancel").onclick = () => {
  parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
};
