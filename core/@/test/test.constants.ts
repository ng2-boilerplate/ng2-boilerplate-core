import {
	BaseRequestOptions,
	ConnectionBackend,
	RequestOptions,
	XHRBackend,
} from '@angular/http';

import {
	MockServerBackend,
	MockServerRouter,
} from '../backend';

import {
	ConfigurationService,
	HttpInterceptor,
	LogService,
} from '../../common';


export const HTTP_CONSTANTS = {
	placeholderEndpoint: 'http://jsonplaceholder.typicode.com/posts',
	responseError: 'Response data is undefined.',
};

export const HTTP_TEST_PROVIDERS: Array<any> = [
	MockServerRouter,
	{ provide: XHRBackend, useClass: MockServerBackend },
	{ provide: ConnectionBackend, useClass: ConnectionBackend },
	{ provide: RequestOptions, useClass: BaseRequestOptions },
	HttpInterceptor,
];

export const DATA_TEST_PROVIDERS: Array<any> = HTTP_TEST_PROVIDERS.concat([
	ConfigurationService,
	LogService,
]);
