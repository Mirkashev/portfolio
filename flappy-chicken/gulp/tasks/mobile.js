import webpack from "webpack-stream";

export const mobile = () => {
  return app.gulp
    .src(app.path.src.mobile)
    .pipe(
      webpack({
        mode: "development",
        devtool: "cheap-module-source-map",
        output: {
          filename: "game.min.js",
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.mobile));
};
