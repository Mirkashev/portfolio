import webpack from 'webpack-stream';

export const jsCaseDetail = () => {
  return app.gulp
    .src(app.path.src.jsCaseDetail)
    .pipe(
      webpack({
        mode: 'development',
        output: {
          filename: 'build.min.js',
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.jsCaseDetail));
};
