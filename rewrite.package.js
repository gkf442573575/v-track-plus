const path = require("path");
const fs = require("fs");
const pkg = require("./package.json");

const packgeJson = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  main: "./index.js",
  types: "./index.d.ts",
  author: "gkf442573575@163.com",
  license: "MIT",
};
console.log(path.join(__dirname, "dist"));
console.log("packgeJson", packgeJson);

fs.writeFileSync(
  path.join(__dirname, "dist/package.json"),
  JSON.stringify(packgeJson, null, 2),
  "utf-8"
);
