const gulp = require('gulp');
const babel = require('gulp-babel');
const gulpIgnore = require('gulp-ignore');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');

gulp.task('babel', () => {
 return gulp.src('./src/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('lib'))
});


gulp.task('default', gulp.series('babel'));
