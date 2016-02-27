var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

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

gulp.task('js', function () {

	var watcher  = watchify(browserify({
		entries: [config.js.src],
		transform: [reactify],
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: true
	}));

	return watcher.on('update', function () {

		watcher.bundle()
			.pipe(source(config.js.out))
			.pipe(streamify(uglify()))
			.pipe(gulp.dest(config.js.dest))
			.pipe(browserSync.stream());

		console.log('Updated');

	})
	.bundle()
	.on('error', handleErrors)
	.pipe(source(config.js.out))
	.pipe(streamify(uglify()))
	.pipe(gulp.dest(config.js.dest))
	.pipe(browserSync.stream());

});

gulp.task('browser-sync', function() {

	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

});

gulp.task('scss-compile', function () {

	return gulp.src(config.scss.src)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(config.scss.dest))
		.pipe(browserSync.stream());

});

gulp.task('scss', ['scss-compile'], function () {

	gulp.watch('./scss/**/*.scss', ['scss-compile']);

});

gulp.task('serve', ['js', 'scss', 'browser-sync']);

gulp.task('default', ['serve']);
