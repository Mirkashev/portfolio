const path = require("path");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "./public/game/js/game.js"),
  },
  output: {
    path: path.resolve(__dirname, "./public/game/js"),
    filename: "[name].bundle.js",
  },
};
