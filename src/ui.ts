// @ts-nocheck
document.getElementById("create").onclick = () => {
  const stripeOneColor = document.getElementById("stripeOneColor").value;
  const stripeTwoColor = document.getElementById("stripeTwoColor").value;
  const angle = document.getElementById("angle").value;
  const height = document.getElementById("rectHeight").value;
  const width = document.getElementById("rectWidth").value;
  const stripeWidth = document.getElementById("stripeWidth").value;

  parent.postMessage(
    {
      pluginMessage: {
        type: "create-background",
        stripeOneColor,
        stripeTwoColor,
        angle,
        height,
        width,
        stripeWidth,
      },
    },
    "*"
  );
};

document.getElementById("cancel").onclick = () => {
  parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
};
