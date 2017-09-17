var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var sass = require('gulp-sass');
var order = require("gulp-order");


gulp.task('concat', function() {
  return gulp.src('asserts/js/**/*.js')
    .pipe(order(['svg.js']))
    .pipe(concat('brighter-chart.js'))
    .pipe(gulp.dest('dest/js/'));
});

gulp.task('compress', function() {
  gulp.src('dest/js/brighter-chart.js')
    .pipe(minify({
        ext:{
            src:'.js',
            min:'.min.js'
        }
    }))
    .pipe(gulp.dest('dest/js/'))
});

gulp.task('sass', function () {
  return gulp.src('asserts/css/**/*.scss')
    .pipe(concat('brighter-chart.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dest/css'));
});


gulp.task('default', ['concat', 'sass'], function(){
    gulp.watch('asserts/js/**/*.js', ['concat']);
    gulp.watch('asserts/css/**/*.scss', ['sass']);
});

