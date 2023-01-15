import webpack from 'webpack-stream';

export const jsForm = () => {
  return app.gulp
    .src(app.path.src.jsForm)
    .pipe(
      webpack({
        mode: 'development',
        output: {
          filename: 'build.min.js',
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.jsForm));
};
