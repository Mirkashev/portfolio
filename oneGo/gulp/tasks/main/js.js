import webpack from 'webpack-stream';

export const jsMain = () => {
  return app.gulp
    .src(app.path.src.jsMain)
    .pipe(
      webpack({
        mode: 'development',
        output: {
          filename: 'build.min.js',
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.jsMain));
};
