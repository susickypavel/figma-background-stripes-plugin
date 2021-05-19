(async () => {
   let { build } = require("esbuild")

   let dev = process.env.NODE_ENV === "development"

   let copyPlugin = {
      name: "copy",
      setup(build) {
         let fs = require("fs");

         fs.access("out", (error) => {
            if (error) {
               fs.mkdir("out", (directoryError) => {
                  if (directoryError) {
                     throw new Error(directoryError.message);
                  } else {
                     fs.copyFile("src/ui.html", "out/ui.html", (copyError) => {
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
            fs.rmdirSync("out", { recursive: true });
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
         outfile: "out/code.js",
         plugins: [cleanPlugin, copyPlugin]
      });
   } catch (error) {
      console.error(error)
   }
})()
