import webpack from 'webpack-stream';

export const jsCases = () => {
  return app.gulp
    .src(app.path.src.jsCases)
    .pipe(
      webpack({
        mode: 'development',
        output: {
          filename: 'build.min.js',
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.jsCases));
};
