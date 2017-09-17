'use strict';

var gulp 	= require('gulp');
var minify 	= require('gulp-minify');
var concat 	= require('gulp-concat');
var order	= require('gulp-order');

// order
	var concatOrder	= [
				'header.js',
				'**/*.js',
				'footer.js'
			];
// javascript
	gulp.task('js', ()=>{
		gulp.src('assets/**/*.js')
			.pipe(order(concatOrder))
			// .on('error',gutil.log)
			.pipe(concat('brighter.js', {newLine: ';'}))
			// .on('error',gutil.log)
			.pipe(gulp.dest('./dest/'));
	});
	gulp.task('js-prod', ()=>{
		gulp.src('assets/**/*.js')
			.pipe(order(concatOrder))
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
gulp.task('default',['js'], function() {
    gulp.watch('assets/**/*.js', ['js']);
});