const gulp = require('gulp');
const babel = require('gulp-babel');
const gulpIgnore = require('gulp-ignore');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
// const spriter = require('gulp-css-spriter');

gulp.task('babel', () => {
 return gulp.src('./src/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('lib'))
});

gulp.task('copy-css', function() {
  return gulp.src('./src/**/*.css').pipe(gulp.dest('./lib'));
});
gulp.task('copy-less', function() {
  return gulp.src('./src/**/*.less').pipe(gulp.dest('./lib'));
});
gulp.task('copy-png', function() {
  return gulp.src('./src/**/*.png').pipe(gulp.dest('./lib'));
});

// 直接拷贝 icon 目录。若确定 雪碧图 可被 IE9 支持的话，可改为压缩成雪碧图
gulp.task('copy-icon', function() {
  return gulp.src('./src/**/icon/*.*')
  .pipe(gulp.dest('./lib'));
});
gulp.task('copy-icon-dist', function() {
  return gulp.src('./src/**/icon/*.*')
  .pipe(rename({dirname: ''}))
  .pipe(gulp.dest('./dist/icon'));
});

const copyResources = gulp.parallel('copy-css', 'copy-less', 'copy-png', 'copy-icon', 'copy-icon-dist');

gulp.task('concat-css', () => {
  return gulp.src('./src/**/*.css')
    .pipe(concat('index.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', () => {
  return gulp.src('./dist/index.css')
    .pipe(concat('index.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('babel', copyResources, 'concat-css', 'minify-css'));

// gulp.task('copy-resource', function() {
//   gulp.src('./src/**/*.css')
//   .pipe(gulp.dest('./lib'));
// });
// gulp.task('concat-css', () => {
//   return gulp.src('./src/**/*.css')
//     .pipe(concat('index.css'))
//     //.pipe(cleanCSS({compatibility: 'ie8'}))
//     .pipe(gulp.dest('dist'));
// });

// 直接拷贝 icon 目录。若确定 雪碧图 可被 IE9 支持的话，可改为压缩成雪碧图
// gulp.task('copy-icon', function() {
//   gulp.src('./src/**/icon/*.*')
//   .pipe(gulp.dest('./lib'));
// });
// gulp.task('copy-icon-dist', function() {
//   gulp.src('./src/**/icon/*.*')
//   .pipe(rename({dirname: ''}))
//   .pipe(gulp.dest('./dist/icon'));
// });
// gulp.task('default', ['babel', 'copy-resource', 'concat-css', 'copy-icon', 'copy-icon-dist']);
