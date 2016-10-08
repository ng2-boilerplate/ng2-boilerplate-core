import {
	inject,
} from '@angular/core/testing';

import {
	LogService,
} from '../../../common';

import {
	TestEnvironment,
} from '../../..//@/test';

describe('Logger Service', () => {
	let logger: LogService;
	let randomData = {
		myFunc: () => { return 'yo'; },
		myInt: 5,
		myString: 'some string',
	};

	beforeEach(() => {
		TestEnvironment.init({
			providers: [
				LogService,
			],
		});
		inject([LogService], (injectedLogger: LogService) => {
			logger = injectedLogger;
		})();
	});

	it('should log messages normally', () => {
		logger.log('log message');
	});

	it('should log warning messages normally', () => {
		logger.warn('warn message');
	});

	it('should log debug messages normally', () => {
		logger.debug('debug message');
	});

	it('should log info messages normally', () => {
		logger.info('info message');
	});

	it('should log messages normally with additional data', () => {
		logger.log('log message', randomData);
	});

	it('should log warning messages normally with additional data', () => {
		logger.warn('warn message', randomData);
	});

	it('should log debug messages normally with additional data', () => {
		logger.debug('debug message', randomData);
	});

	it('should log info messages normally with additional data', () => {
		logger.info('info message', randomData);
	});
});
