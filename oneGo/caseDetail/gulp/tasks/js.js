import webpack from "webpack-stream";

export const js = () => {
  return app.gulp
    .src(app.path.src.js)
    .pipe(
      webpack({
        mode: "development",
        output: {
          filename: "build.min.js",
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browserSync.stream());
};
