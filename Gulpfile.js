const gulp = require('gulp'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      uglify = require('gulp-uglify'),
      size = require('gulp-size'),
      concat = require('gulp-concat');

gulp.task('js', () => {
  gulp.src([
    'frontend/js/vendor/jquery.js',
    'frontend/js/vendor/tether.js',
    'frontend/js/vendor/lodash.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'frontend/js/application.js',
    'frontend/js/components/**/*.js'
  ]).pipe(concat('application.js'))
    .pipe(size())
    .pipe(gulp.dest('public/js'));
});

gulp.task('scss', () => {
  gulp.src('frontend/scss/application.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: 'compressed' }))
      .pipe(concat('application.css'))
      .pipe(size())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('public/css'));
});

gulp.task('default', ['scss', 'js'], () => {
  gulp.watch('frontend/scss/**/*.scss', ['scss']);
  gulp.watch('frontend/js/**/*.js', ['js']);
});
