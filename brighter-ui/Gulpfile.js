'use strict';

var gulp 	= require('gulp');
var minify 	= require('gulp-minify');
var concat 	= require('gulp-concat');
var order	= require('gulp-order');

// order
		var concatOrder	= [
			'header.js',
			'*/**/*.js',
			'footer.js'
		];
// js
	gulp.task('js', ()=>{
		// compile
			gulp.src('assets/js/**/*.js')
			// gulp.src('assets/**/*.js')
				.pipe(order(concatOrder))
				// .on('error',gutil.log)
				.pipe(concat('brighter-ui.js', {newLine: ";\n"}))
				// .on('error',gutil.log)
				.pipe(gulp.dest('./dest/'));
	});
	gulp.task('js-prod', ()=>{
		// compile
			gulp.src('assets/js/**/*.js')
			// gulp.src('assets/**/*.js')
				.pipe(order(concatOrder))
				// .on('error',gutil.log)
				.pipe(concat('brighter-ui.js', {newLine: ";\n"}))
				.pipe(minify({
			        ext:{
			            src:'-debug.js',
			            min:'.min.js'
			        }
			        // exclude: ['tasks'],
			        // ignoreFiles: ['.combo.js', '-min.js']
			    }))
				// .on('error',gutil.log)
				.pipe(gulp.dest('./dest/'));
	});





	gulp.task('web', ['web-js'], ()=>{
		gulp.watch('assets/js/**/*.js', ['web-js']);
	});
	gulp.task('web-prod', ()=>{
		gulp.src(['assets/**/*.js', '!assets/extension/**/*', '!assets/nodejs/**/*'])
			.pipe(order(concatOrder))
			.pipe(concat('brighter.js', {newLine: ";\n"}))
			.pipe(minify({
		        ext:{
		            src:'-debug.js',
		            min:'.min.js'
		        }
		        // exclude: ['tasks'],
		        // ignoreFiles: ['.combo.js', '-min.js']
		    }))
			.pipe(gulp.dest('./dest/'));
	});
// extension tasks
	gulp.task('extension', ()=>{
		// compile
			gulp.src(['assets/**/*.js', '!assets/nodejs/**/*'])
				.pipe(order(extConcatOrder))
				// .on('error',gutil.log)
				.pipe(concat('brighter.js', {newLine: ";\n"}))
				// .on('error',gutil.log)
				.pipe(gulp.dest('./dest/'));
		// watch
			gulp.watch('assets/**/*.js', ['extension']);
	});
	gulp.task('extension-prod', ()=>{
		gulp.src(['assets/**/*.js', '!assets/nodejs/**/*'])
			.pipe(order(extConcatOrder))
			.pipe(concat('brighter.js', {newLine: ";\n"}))
			.pipe(minify({
		        ext:{
		            src:'-debug.js',
		            min:'.min.js'
		        }
		        // exclude: ['tasks'],
		        // ignoreFiles: ['.combo.js', '-min.js']
		    }))
			.pipe(gulp.dest('./dest/'));
	});

//Watch task
gulp.task('default', function() {
    console.log('please choose: web, extension or nodejs; add "-prod" to minify code');
});