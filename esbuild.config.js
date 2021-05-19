(async () => {
   let { build } = require("esbuild")

   let dev = process.env.NODE_ENV === "development"

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
         sourcemap: dev,
         minify: !dev,
         bundle: true,
         outfile: "out/code.js",
         plugins: [cleanPlugin]
      });
   } catch (error) {
      console.error(error)
   }
})()
