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

gulp.task('copy-resource', function() {
  gulp.src('./src/**/*.css').pipe(gulp.dest('./lib'));
  gulp.src('./src/**/*.less').pipe(gulp.dest('./lib'));
  gulp.src('./src/**/*.png').pipe(gulp.dest('./lib'));
});

gulp.task('minify-css', () => {
  return gulp.src('./src/**/*.css')
    .pipe(concat('index.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['babel', 'copy-resource', 'minify-css']);
