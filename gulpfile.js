var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');

var path = {
	js: './src/index.js',
	out: 'bundle.js',
	dest: './src'
};

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
		entries: [path.js],
		transform: [reactify],
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: true
	}));

	return watcher.on('update', function () {

		watcher.bundle()
			.pipe(source(path.out))
			.pipe(streamify(uglify()))
			.pipe(gulp.dest(path.dest));

		console.log('Updated');

	})
	.bundle()
	.on('error', handleErrors)
	.pipe(source(path.out))
	.pipe(streamify(uglify()))
	.pipe(gulp.dest(path.dest));

});

gulp.task('default', ['js']);
