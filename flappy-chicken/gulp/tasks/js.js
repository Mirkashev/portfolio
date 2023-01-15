import webpack from "webpack-stream";

export const js = () => {
  return app.gulp
    .src(app.path.src.js)
    .pipe(
      webpack({
        mode: "development",
          devtool: 'cheap-module-source-map',
        output: {
          filename: "game.min.js",
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.js));
};
