import {
	ResponseOptions,
	Headers,
} from '@angular/http';

/**
 * Delay a response by a specific amount.
 * @param  {number}                   timeout=250 Delay the response by timeout ms
 * @return {Promise<ResponseOptions>}             Use this as return value for routes. e.g. `return delay(resOptions, 1000)`
 */
export let delay = (res: ResponseOptions, timeout = 250): Promise<ResponseOptions> => {
	return new Promise<ResponseOptions>((resolve, reject) => {
		setTimeout(() => {
			resolve(res);
		}, timeout);
	});
};

/**
 * Helper function to easily respond with JSON and a given status code. Adds `Content-Type: application/json` header.
 * @param  {number}                   status      HTTP status code
 * @param  {Object}                   obj         Object to serialise as JSON in the response body
 * @param  {number}                   timeout=250 Delay the response by timeout ms
 * @return {Promise<ResponseOptions>}             Use this as return value for routes. e.g. `return json(200, {id: 3, title: 'Orange'})`
 */
export let json = (status: number, obj: Object, timeout = 250): Promise<ResponseOptions> => {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json');
	return delay(new ResponseOptions({
		body: JSON.stringify(obj),
		headers: headers,
		status: status,
	}), timeout);
};

/**
 * Helper function to easily respond with a body string and a given status code. Does not set any response headers.
 * @param  {number}                   status      HTTP status code
 * @param  {string}                   body        Response body. Can be empty string (`''`).
 * @param  {number}                   timeout=250 Delay the response by timeout ms
 * @return {Promise<ResponseOptions>}             Use this as return value for routes. e.g. `return res(200, '<li>Orange</li>')`
 */
export let res = (status: number, body: string, timeout = 250): Promise<ResponseOptions> => {
	return delay(new ResponseOptions({
		body: body,
		status: status,
	}), timeout);
};

export let badRequest = res(500, 'Bad Request');

