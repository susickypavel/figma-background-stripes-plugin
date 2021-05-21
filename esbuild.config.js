(async () => {
  const outputDirectory = "out";

  let { build } = require("esbuild");
  let fs = require("fs");
  let { readFile, writeFile } = require("fs").promises;
  let { minify } = require("html-minifier-terser");

  let dev = process.env.NODE_ENV === "development";

  let copyPlugin = {
    name: "copy",
    setup(build) {
      fs.access(outputDirectory, (error) => {
        if (error) {
          fs.mkdir(outputDirectory, (directoryError) => {
            if (directoryError) {
              throw new Error(directoryError.message);
            } else {
              fs.copyFile(
                "src/ui.html",
                outputDirectory + "/ui.html",
                (copyError) => {
                  if (copyError) {
                    throw new Error(copyError.message);
                  }
                }
              );
            }
          });
        }
      });
    },
  };

  let cleanPlugin = {
    name: "clean",
    setup(build) {
      try {
        fs.rmdirSync(outputDirectory, { recursive: true });
      } catch (error) {
        console.error(error);
      }
    },
  };

  try {
    let result = await build({
      logLevel: "debug",
      entryPoints: ["src/code.ts", "src/ui.tsx"],
      watch: dev,
      sourcemap: dev,
      minify: !dev,
      bundle: true,
      write: false,
      outdir: outputDirectory,
      plugins: [cleanPlugin, copyPlugin],
    });

    for (const file of result.outputFiles) {
      if (/ui[.]js$/.test(file.path)) {
        let html = await readFile("src/ui.html", "utf8");

        let minifiedHtml = minify(html, {
          collapseWhitespace: true,
          keepClosingSlash: false,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
          minifyCSS: true,
        });

        await writeFile(
          outputDirectory + "/ui.html",
          `${minifiedHtml}<script>${file.text.replace(
            "</script>",
            "</ + script>"
          )}</script>`
        );
      } else {
        await writeFile(file.path, file.text);
      }
    }
  } catch (error) {
    console.error(error);
  }
})();
