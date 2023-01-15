import webpack from 'webpack-stream';

export const jsBusiness = () => {
  return app.gulp
    .src(app.path.src.jsBusiness)
    .pipe(
      webpack({
        mode: 'development',
        output: {
          filename: 'build.min.js',
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.jsBusiness));
};
