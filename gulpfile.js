var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var reactify = require('reactify');
var babelify = require('babelify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var svg = require('svg-browserify');
const eslint = require('gulp-eslint');

var config = require('./gulp.config')();

function handleErrors() {

	var args = Array.prototype.slice.call(arguments);

	notify
		.onError({
			title: "Compile Error",
			message: "<%= error.message %>"
		})
		.apply(this, args);

	this.emit('end');

}

var jsWatcher  = watchify(browserify({
	entries: [ config.js.src ],
	transform: [
		[ babelify, { presets: [ 'es2015', 'react'] } ],
		[ reactify, { es6: true } ],
		svg
	],
	debug: true,
	cache: {},
	packageCache: {},
	fullPaths: true
}));

var jsCompile = function() {

	jsWatcher.bundle()
		.on('error', handleErrors)
		.pipe(source(config.js.out))
		.pipe(streamify(uglify()))
		.pipe(gulp.dest(config.dest))
		.pipe(browserSync.stream());

	console.log('JS Compiled');

}

gulp.task('js-compile', jsCompile);

gulp.task('js', ['js-compile'], function() {

	return jsWatcher.on('update', jsCompile);

});

gulp.task('browser-sync', function() {

	browserSync.init({
		server: {
			baseDir: './'
		}
	});

});

gulp.task('scss-compile', function() {

	return gulp.src(config.scss.src)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(config.dest))
		.pipe(browserSync.stream());

});

gulp.task('scss', ['scss-compile'], function() {

	gulp.watch('./scss/**/*.scss', ['scss-compile']);

});

gulp.task('lint', () => {

	return gulp.src(['**/*.js','!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());

});

gulp.task('serve', ['js', 'scss', 'browser-sync']);

gulp.task('default', ['serve']);
