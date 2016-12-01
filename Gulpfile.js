const gulp = require('gulp'),
      sass = require('gulp-sass'),
      runSequence = require('run-sequence').use(gulp),
      sourcemaps = require('gulp-sourcemaps'),
      rev = require('gulp-rev'),
      revDel = require('rev-del'),
      uglify = require('gulp-uglify'),
      size = require('gulp-size'),
      concat = require('gulp-concat');

gulp.task('js', () => {
  return gulp.src([
    'frontend/js/vendor/jquery.js',
    'frontend/js/vendor/tether.js',
    'frontend/js/vendor/lodash.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'frontend/js/application.js',
    'frontend/js/components/**/*.js'
  ]).pipe(concat({ path: 'application.js', cwd: '' }))
    .pipe(size())
    .pipe(rev())
    .pipe(gulp.dest('public/js'))
    .pipe(rev.manifest('config/assets.json', {
        base: 'config',
        merge: true
    }))
    .pipe(revDel({
        dest: 'public/js',
        oldManifest: 'config/assets.json'
    }))
    .pipe(gulp.dest('config'));
});

gulp.task('scss', () => {
  return gulp.src('frontend/scss/application.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: 'compressed' }))
      .pipe(concat({ path: 'application.css', cwd: '' }))
      .pipe(size())
      .pipe(rev())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('public/css'))
      .pipe(rev.manifest('config/assets.json', {
          base: 'config',
          merge: true
      }))
      .pipe(revDel({
          dest: 'public/css',
          oldManifest: 'config/assets.json'
      }))
      .pipe(gulp.dest('config'));
});

gulp.task('default', ['js', 'scss'], () => {
  gulp.watch('frontend/scss/**/*.scss', ['scss']);
  gulp.watch('frontend/js/**/*.js', ['js']);
});
