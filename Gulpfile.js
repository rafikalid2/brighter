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
				'native-plugins/**/*.js',
				'lib/**/*.js',
				'jQuery-plugins/basic/**/*.js',
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
				'native-plugins/**/*.js',
				'lib/**/*.js',
				'jQuery-plugins/basic/**/*.js',
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

// local
	gulp.task('locales', ()=>{
		gulp.src('assets/locales/**/*.js')
			.pipe(gulp.dest('./dest/locales/'));
	});

	gulp.task('locales-prod', ()=>{
		gulp.src('assets/locales/**/*.js')
			.pipe(minify({
		        ext:{
		            src:'-debug.js',
		            min:'.min.js'
		        },
		    }))
			.pipe(gulp.dest('./dest/locales/'));
	});

//Watch task
gulp.task('default',['styles', 'js', 'locales'], function() {
    gulp.watch('assets/sass/**/*.scss',['styles']);
    gulp.watch('assets/js/**/*.js', ['js']);
    gulp.watch('assets/locales/**/*.js', ['locales']);
});