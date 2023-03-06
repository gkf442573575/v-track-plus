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
  keywords: [
    "v-track",
    "v-track-plus",
    "vue3",
    "track",
    "trackjs",
    "vue3 track",
    "vue3-track",
  ],
  repository: {
    type: "git",
    url: "https://github.com/gkf442573575/v-track-plus.git",
  },
  bugs: {
    url: "https://github.com/gkf442573575/v-track-plus/issues",
  },
  homepage: "https://github.com/gkf442573575/v-track-plus#readme",
};

fs.writeFileSync(
  path.join(__dirname, "dist/package.json"),
  JSON.stringify(packgeJson, null, 2),
  "utf-8"
);
