'use strict';

var gulp 	= require('gulp');
var minify 	= require('gulp-minify');
var concat 	= require('gulp-concat');
var order	= require('gulp-order');

// order
	// web
		var concatOrder	= [
			'header.js',
			'plugin.js',
			'lib/**/*.js',
			'web-root-operations.js',
			'root-attributes.js',
			'core/**/*.js',
			'web/**/*.js',
			'footer.js'
		];
	// extension
		var extConcatOrder	= [
			'header.js',
			'plugin.js',
			'lib/**/*.js',
			'web-root-operations.js',
			'root-attributes.js',
			'core/**/*.js',
			'web/**/*.js',
			'extension/**/*.js',
			'footer.js'
		];
	// nodejs
		//TODO
// web tasks
	gulp.task('web', ()=>{
		// compile
			gulp.src(['assets/**/*.js', '!assets/extension/**/*', '!assets/nodejs/**/*'])
				.pipe(order(concatOrder))
				// .on('error',gutil.log)
				.pipe(concat('brighter.js', {newLine: ";\n"}))
				// .on('error',gutil.log)
				.pipe(gulp.dest('./dest/'));
		// watch
			gulp.watch('assets/**/*.js', ['web']);
	});
	gulp.task('web-prod', ()=>{
		gulp.src('assets/**/*.js', '!assets/extension/**/*', '!assets/nodejs/**/*')
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
			gulp.src('assets/**/*.js', '!assets/nodejs/**/*')
				.pipe(order(extConcatOrder))
				// .on('error',gutil.log)
				.pipe(concat('brighter.js', {newLine: ";\n"}))
				// .on('error',gutil.log)
				.pipe(gulp.dest('./dest/'));
		// watch
			gulp.watch('assets/**/*.js', ['extension']);
	});
	gulp.task('extension-prod', ()=>{
		gulp.src('assets/**/*.js', '!assets/nodejs/**/*')
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