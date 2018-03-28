require("babel-core/register")({
  presets: [
    "stage-3", "latest-node"
  ],
  plugins: ['transform-decorators-legacy']
});

require("babel-polyfill");
require("./server");
