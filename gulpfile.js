let gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename');

gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('scss', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }))
    /*
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(rename({ suffix: '.min' })) */
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function () {
  return gulp.src('src/js/*.js')
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('js-libs', function () {
  return gulp.src([
    '',
    ''
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('img', function () {
  return gulp.src('src/img/*.*')
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "src/"
    }
  });
});

gulp.task('watch', function () {
  gulp.watch('src/scss/*.scss', gulp.parallel('scss'))
  gulp.watch('src/*.html', gulp.parallel('html'))
  gulp.watch('src/*.js', gulp.parallel('js'))
  gulp.watch('src/img/*.*', gulp.parallel('img'))
});

gulp.task('default', gulp.parallel('html', 'scss', 'js', 'img', 'browser-sync', 'watch'))
