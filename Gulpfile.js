const gulp = require('gulp'),
      sass = require('gulp-sass'),
      concat = require('gulp-concat');

gulp.task('default', () => {
  console.log('default task runs');
});

gulp.task('scss', () => {
  gulp.src('frontend/scss/application.scss')
      .pipe(sass({ outputStyle: 'compressed' }))
      .pipe(concat('application.css'))
      .pipe(gulp.dest('public/css'));
});



gulp.task('watch', ['scss'], () => {
  gulp.watch('frontend/scss/**/*.scss', ['scss']);
});
