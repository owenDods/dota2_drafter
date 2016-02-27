module.exports = function () {

	'use strict';

	var buildDest = './build';
	var config = {

		js: {
			src: './src/index.js',
			out: 'bundle.js',
			dest: buildDest
		},

		scss: {
			src: './scss/app.scss',
			dest: buildDest
		}

	};

	return config;

};