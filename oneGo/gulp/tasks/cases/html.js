import fileinclude from 'gulp-file-include';
import versionNumber from 'gulp-version-number';

export const htmlCases = () => {
  // console.log(app.path.src.html);
  return app.gulp
    .src(app.path.src.htmlCases)
    .pipe(fileinclude())
    .pipe(
      versionNumber({
        value: '%DT%',
        append: {
          key: '_v',
          cover: 0,
          to: ['css', 'js'],
        },
        output: {
          file: 'gulp/version.json',
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.htmlCases));
};
