'use strict';

var gulp 	= require('gulp');
var sass 	= require('gulp-sass');
var minify 	= require('gulp-minify');
var concat 	= require('gulp-concat');
var order	= require('gulp-order');
// var gutil	= require('gulp-util');

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


// javascript
	gulp.task('js', ()=>{
		gulp.src('assets/js/**/*.js')
			.pipe(order([
				'params.js',
				'lib/**/*.js',
				'jQuery-plugins/**/*.js',
				'initializer.js'
			]))
			// .on('error',gutil.log)
			.pipe(concat('brighter.js', {newLine: ';'}))
			// .on('error',gutil.log)
			.pipe(gulp.dest('./dest/'));
	});
	gulp.task('js-prod', ()=>{
		gulp.src('assets/js/**/*.js')
			.pipe(order([
				'params.js',
				'lib/**/*.js',
				'jQuery-plugins/**/*.js',
				'initializer.js'
			]))
			.pipe(minify({
		        ext:{
		            src:'-debug.js',
		            min:'.min.js'
		        },
		        // exclude: ['tasks'],
		        // ignoreFiles: ['.combo.js', '-min.js']
		    }))
			.pipe(gulp.dest('./dest/'));
	});

//Watch task
gulp.task('default',['styles', 'js'], function() {
    gulp.watch('assets/sass/**/*.scss',['styles']);
    gulp.watch('assets/js/**/*.js', ['js']);
});