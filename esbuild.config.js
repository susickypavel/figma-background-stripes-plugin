var dev = process.env.NODE_ENV === "development"

console.log(dev);

require("esbuild").build({
   entryPoints: ["src/code.ts"],
   bundle: true,
   outfile: "out/code.js"
});
