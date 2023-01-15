import webpack from "webpack-stream";

export const adminTask = () => {
  return app.gulp
    .src(app.path.src.admin)
    .pipe(
      webpack({
        mode: "development",
        devtool: "cheap-module-source-map",
        output: {
          filename: "config.min.js",
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.admin));
};
