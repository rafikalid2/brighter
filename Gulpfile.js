'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('assets/sass/brighter.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dest/'));
});


gulp.task('styles-prod', function() {
    gulp.src('assets/sass/brighter.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('brighter.min.css'))
        .pipe(gulp.dest('./dest/'));
});

//Watch task
gulp.task('default',function() {
    gulp
    	.watch('assets/sass/**/*.scss',['styles']);
});