import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import sourceMaps from 'gulp-sourcemaps';
import minifyCss from 'gulp-clean-css';
import prefixer from 'gulp-autoprefixer';

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp
    .src(['../commonSrc/styles/index.scss', app.path.src.scss])
    .pipe(concat('index.scss'))
    .pipe(sourceMaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(
      prefixer({
        cascade: false,
      })
    )
    .pipe(minifyCss())
    .pipe(sourceMaps.write())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browserSync.stream());
};
