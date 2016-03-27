module.exports = function () {

	'use strict';

	var buildDest = './build';
	var config = {

		dest: buildDest,

		js: {
			src: './src/index.js',
			out: 'bundle.js'
		},

		scss: {
			src: './scss/app.scss'
		}

	};

	return config;

};