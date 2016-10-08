import {
	inject,
} from '@angular/core/testing';

import {
	ConfigurationService,
} from '../../../common';

import {
	TestEnvironment,
} from '../../..//@/test';

describe('Configuration Service', () => {
	let config: ConfigurationService;

	beforeEach(() => {
		TestEnvironment.init({
			providers: [
				ConfigurationService,
			],
		});
		inject([ConfigurationService], (injectedConfig: ConfigurationService) => {
			config = injectedConfig;
		})();

		config.secure = true;
	});

	afterEach(() => {
		config.secure = false;
	});

	it('should generate a valid URL with defaul dev settings', () => {
		expect(config.endpoint).toBe('https://my.site.domain:80/api/3/');
	});

	it('should generate a valid URL without the port number present', () => {
		config.port = false;
		expect(config.endpoint).toBe('https://my.site.domain/api/3/');
	});

	it('should generate a valid URL with any 16bit port number (except 0)', () => {
		for (let port = 0, max = (1 << 16); port < max; port++) {
			config.port = port;
			if (port === 0) {
				expect(config.endpoint).toBe('https://my.site.domain/api/3/');
			} else {
				expect(config.endpoint).toBe(`https://my.site.domain:${port}/api/3/`);
			}
		}
	});

	it('should have JSON content header by default', () => {
		let contentType = config.headers.get('Content-Type');
		expect(contentType).toBe('application/json');
	});

	it('should have Authorization header after setting the access token', () => {
		let authorization = 'b515aeb1a531ea6eb3d7ec1ae96bfc6eef6b98b9';
		config.authorization = authorization;
		let auth = config.headers.get('Authorization');
		expect(auth).toBe(authorization);
	});

	it('should have a new Authorization header after changing the access token', () => {
		let headerKey = 'Authorization';
		let authorization = '5459a15359490f482ed622fbcc87cc3391aa57e0';
		config.authorization = authorization;
		let auth = config.headers.get(headerKey);
		expect(auth).toBe(authorization);
		expect(config.headers.getAll(headerKey).length).toBe(1);
	});

	it('should generate a new URL after setting a new realm', () => {
		config.subDomain = 'your';
		expect(config.endpoint).toBe('https://your.site.domain:80/api/3/');
	});

	// it('should generate an insecure URL after changing protocol type', () => {
	// 	config.secure = false;
	// 	expect(config.endpoint).toBe('http://my,site.domain:80/api/3/');
	// });

	// it('should generate a secure URL after changing protocol type', () => {
	// 	config.secure = false;
	// 	expect(config.endpoint).toBe('http://my,site.domain:80/api/3/');
	// 	config.secure = true;
	// 	expect(config.endpoint).toBe('https://my.site.domain:80/api/3/');
	// });

	it('should be able to return the default subdomain', () => {
		expect(config.subDomain).toBeDefined();
		expect(config.subDomain).toBe('my');
	});
});
