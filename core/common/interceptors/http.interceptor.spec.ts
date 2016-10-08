import {
	inject,
} from '@angular/core/testing';

import {
	HttpModule,
	Response,
} from '@angular/http';

import {
	HTTP_CONSTANTS,
	HTTP_TEST_PROVIDERS,
	TestEnvironment,
} from '../..//@/test';

import {
	ConfigurationService,
	LogService,
} from '../services';

import {
	HttpInterceptor,
} from './http.interceptor';

describe('Http Interceptor', () => {
	let http: HttpInterceptor;

	beforeEach(() => {
		// intialize the test bed
		TestEnvironment.init({
			imports: [
				HttpModule,
			],
			providers: HTTP_TEST_PROVIDERS.concat([
				ConfigurationService,
				LogService,
			]),
		});
		// inject http interceptor instance before each test
		inject([HttpInterceptor], (injectedHttp: HttpInterceptor) => {
			http = injectedHttp;
		})();
	});

	it('should GET data', (done) => {
		http.get(`${HTTP_CONSTANTS.placeholderEndpoint}/1`).subscribe((data: Response) => {
			let responseData: IPostMock = data.json();
			expect(responseData).toBeDefined(HTTP_CONSTANTS.responseError);
			expect(responseData.id).toBe(1);
			expect(responseData.userId).toBe(1);
			expect(responseData.title.length).toBeGreaterThan(0);
			expect(responseData.body.length).toBeGreaterThan(0);
			done();
		});
	});

	it('should POST data', (done) => {
		let fakePost: IPostMock = {
			body: 'I\'m a simple unit test...',
			title: 'Testing Post',
			userId: 2,
		};
		http.post(HTTP_CONSTANTS.placeholderEndpoint, fakePost).subscribe((data: Response) => {
			let responseData: IPostMock = data.json();
			expect(responseData).toBeDefined(HTTP_CONSTANTS.responseError);
			expect(responseData.id).toBe(101);
			expect(responseData.userId).toBe(fakePost.userId);
			expect(responseData.title).toBe(fakePost.title);
			expect(responseData.body).toBe(fakePost.body);
			done();
		});
	});

	it('should PUT data', (done) => {
		let fakePost: IPostMock = {
			body: 'I\'m a simple unit test...',
			title: 'Testing Post',
			userId: 2,
		};
		http.put(`${HTTP_CONSTANTS.placeholderEndpoint}/1`, fakePost).subscribe((data: Response) => {
			let responseData: IPostMock = data.json();
			expect(responseData).toBeDefined(HTTP_CONSTANTS.responseError);
			expect(responseData.id).toBe(1);
			expect(responseData.userId).toBe(fakePost.userId);
			expect(responseData.title).toBe(fakePost.title);
			expect(responseData.body).toBe(fakePost.body);
			done();
		});
	});

	it('should DELETE data', (done) => {
		http.delete(`${HTTP_CONSTANTS.placeholderEndpoint}/1`).subscribe((data: Response) => {
			let responseData: IPostMock = data.json();
			expect(responseData).toBeDefined(HTTP_CONSTANTS.responseError);
			done();
		});
	});

	it('should fail with 404', (done) => {
		http.get(`http://somewebsite.com/some/resource`).subscribe(null, (err) => {
			expect(err.ok).toBeFalsy();
			expect(err.status).toBe(404);
			done();
		});
	});
});
