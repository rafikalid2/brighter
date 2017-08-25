var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var order = require('gulp-order');

gulp.task('concat', function(){
	gulp.src('src/js/**/*.js')
	.pipe(order(['wysiwyg.js', 'config.js']))
	.pipe(concat('wysiwyg.js'))
	.pipe(gulp.dest('dest/js'));
});

gulp.task('sass', function () {
  	gulp.src('src/css/**/*.scss')
    .pipe(concat('wysiwyg.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dest/css'));
});

gulp.task('default', ['concat', 'sass'], function(){
	gulp.watch('src/js/**/*.js', ['concat']);
	gulp.watch('src/css/**/*.scss', ['sass']);
})