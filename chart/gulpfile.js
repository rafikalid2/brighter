var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var sass = require('gulp-sass');


gulp.task('concat', function() {
  return gulp.src('debug/js/**/*.js')
    .pipe(concat('brighter-chart.js'))
    .pipe(gulp.dest('assets/js/'));
});

gulp.task('compress', function() {
  gulp.src('assets/js/brighter-chart.js')
    .pipe(minify({
        ext:{
            src:'.js',
            min:'-min.js'
        }
    }))
    .pipe(gulp.dest('assets/js/'))
});

gulp.task('sass', function () {
  return gulp.src('debug/css/**/*.scss')
    .pipe(concat('brighter-chart.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets/css'));
});


gulp.task('default', ['concat', 'sass'], function(){
    gulp.watch('debug/js/**/*.js', ['concat']);
    gulp.watch('debug/css/**/*.scss', ['sass']);
});

