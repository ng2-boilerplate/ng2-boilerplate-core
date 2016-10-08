import {
	inject,
} from '@angular/core/testing';

import {
	HttpModule,
} from '@angular/http';

import {
	HTTP_CONSTANTS,
	DATA_TEST_PROVIDERS,
	TestEnvironment,
} from '../../../..//@/test';

import {
	HttpInterceptor,
	LogService,
} from '../../../../common';

import {
	DataService,
} from '../../data';

describe('Data Service', () => {
	let http: DataService;

	beforeEach(() => {
		// intialize the test bed
		TestEnvironment.init({
			imports: [
				HttpModule,
			],
			providers: DATA_TEST_PROVIDERS,
		});

		// inject http interceptor instance before each test
		inject([HttpInterceptor, LogService], (injectedHttp: HttpInterceptor, injectedLogger: LogService) => {
			http = new DataService(injectedHttp, injectedLogger);
		})();
	});

	it('should GET data', (done) => {
		http.get<IPostMock>(`${HTTP_CONSTANTS.placeholderEndpoint}/1`).subscribe((data: IPostMock) => {
			let responseData: IPostMock = data;
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
		http.post<IPostMock>(HTTP_CONSTANTS.placeholderEndpoint, fakePost).subscribe((data: IPostMock) => {
			let responseData: IPostMock = data;
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
		http.put<IPostMock>(`${HTTP_CONSTANTS.placeholderEndpoint}/1`, fakePost).subscribe((data: IPostMock) => {
			let responseData: IPostMock = data;
			expect(responseData).toBeDefined(HTTP_CONSTANTS.responseError);
			expect(responseData.id).toBe(1);
			expect(responseData.userId).toBe(fakePost.userId);
			expect(responseData.title).toBe(fakePost.title);
			expect(responseData.body).toBe(fakePost.body);
			done();
		});
	});

	it('should DELETE data', (done) => {
		http.delete<IPostMock>(`${HTTP_CONSTANTS.placeholderEndpoint}/1`).subscribe((data: IPostMock) => {
			let responseData: IPostMock = data;
			expect(responseData).toBeDefined(HTTP_CONSTANTS.responseError);
			done();
		});
	});

	it('should fail with 404', (done) => {
		http.get(`http://somewebsite.com/some/resource`).subscribe(null, (err) => {
			expect(err.ok).toBeFalsy();
			done();
		});
	});
});
