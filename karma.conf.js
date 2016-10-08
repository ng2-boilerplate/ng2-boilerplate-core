module.exports = function (config) {
	var reportsPath = './coverage/';
	config.set({
		autoWatch: true,
		basePath: '.',
		browserify: {
			debug: true,
			transform: [require('browserify-istanbul')({
				ignore: ['node_modules/**', 'core/*.spec.js'],
			})]
		},
		browsers: [
			'PhantomJS'
		],
		captureTimeout: 60000,
		colors: true,
		coveragePreprocessor: {
			exclude: ["core/**/*.spec.js"]
		},
		coverageReporter: {
			dir: reportsPath + 'js/',
			reporters: [
				{ type: 'json', subdir: 'report-json' },
				{ type: 'html', subdir: 'report-html' },
			]
		},
		exclude: [
			'core/@/**/*.js'
		],
		files: [
			/**
			 * NOTE:
			 * Automapper can be replaced by injecting a different mapping interface.
			 */
			'node_modules/automapper-ts/dist/automapper.min.js',
			/** ------------------------------------------------------------------ */
			'node_modules/core-js/client/shim.min.js',
			'node_modules/zone.js/dist/zone.js',
			'node_modules/zone.js/dist/long-stack-trace-zone.js',
			'node_modules/zone.js/dist/async-test.js',
			'node_modules/zone.js/dist/fake-async-test.js',
			'node_modules/zone.js/dist/sync-test.js',
			'node_modules/zone.js/dist/proxy.js',
			'node_modules/zone.js/dist/jasmine-patch.js',
			'node_modules/chance/chance.js',
			'core/**/*.js'
		],
		frameworks: [
			'browserify',
			'jasmine'
		],
		logLevel: config.LOG_ERROR,
		port: 9876,
		preprocessors: {
			'core/**/*.js': [
				'browserify'
			],
			'core/**/!(*spec).js)': [
				'coverage'
			]
		},
		proxies: {
			'/src/': '/base/src/',
			'/app/': '/base/src/app/',
			'/node_modules/': '/base/node_modules/'
		},
		reporters: [
			'spec',
			'coverage',
			'karma-remap-istanbul'
		],
		remapIstanbulReporter: {
			reports: {
				html: reportsPath + 'ts/report-html',
				json: reportsPath + 'ts/report-json/coverage-final.json',
			}
		},
		singleRun: true
	});
};
