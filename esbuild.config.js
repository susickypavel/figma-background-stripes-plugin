(async () => {
   const outputDirectory = "out";

   let { build } = require("esbuild")

   let dev = process.env.NODE_ENV === "development"

   let copyPlugin = {
      name: "copy",
      setup(build) {
         let fs = require("fs");

         fs.access(outputDirectory, (error) => {
            if (error) {
               fs.mkdir(outputDirectory, (directoryError) => {
                  if (directoryError) {
                     throw new Error(directoryError.message);
                  } else {
                     fs.copyFile("src/ui.html", outputDirectory + "/ui.html", (copyError) => {
                        if (copyError) {
                           throw new Error(copyError.message);
                        }
                     });
                  }
               });
            }
         });
      }
   }

   let cleanPlugin = {
      name: "clean",
      setup(build) {
         let fs = require("fs");

         try {
            fs.rmdirSync(outputDirectory, { recursive: true });
         } catch (error) {
            console.error(error);
         }
      }
   }

   try {
      await build({
         entryPoints: ["src/code.ts"],
         watch: dev,
         sourcemap: dev,
         minify: !dev,
         bundle: true,
         outfile: outputDirectory + "/code.js",
         plugins: [cleanPlugin, copyPlugin]
      });
   } catch (error) {
      console.error(error)
   }
})()
