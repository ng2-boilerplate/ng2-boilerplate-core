import {
	Injectable,
} from '@angular/core';

import {
	Http,
	RequestOptionsArgs,
	Response,
} from '@angular/http';

import {
	Observable,
} from 'rxjs/Observable';

import 'rxjs/add/operator/share';

import {
	ConfigurationService,
	LogService,
} from '../services';

import {
	IsIt,
} from '../helpers';

/**
 *
 * Simply configure the bootstrapper to intercept and forward any Http injects to HttpInterceptor
 * provide(Http, {
        useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions) => new HttpInterceptor(xhrBackend, requestOptions),
        deps: [XHRBackend, RequestOptions]
    })
 * @export
 * @class HttpInterceptor
 * @extends {Http}
 */
@Injectable()
export class HttpInterceptor {
	constructor(private http: Http, private config: ConfigurationService, private logger: LogService) {
	}

	/**
	 * Will initiate a GET request to the provided url.
	 *
	 * @param {string} url
	 * @param {RequestOptionsArgs} [options]
	 * @returns {Observable<Response>}
	 *
	 * @memberOf HttpInterceptor
	 */
	get(url: string, options?: RequestOptionsArgs): Observable<Response> {
		var response = this.http.get(this.endpoint(url), this.interceptOptions(options));
		return this.intercept(response);
	}

	/**
	 * Will initiate a POST request to the provided url.
	 *
	 * @param {string} url
	 * @param {any} body
	 * @param {RequestOptionsArgs} [options]
	 * @returns {Observable<Response>}
	 *
	 * @memberOf HttpInterceptor
	 */
	post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
		var response = this.http.post(this.endpoint(url), body, this.interceptOptions(options));
		return this.intercept(response);
	}

	/**
	 * Will initiate a PUT request to the provided url.
	 *
	 * @param {string} url
	 * @param {any} body
	 * @param {RequestOptionsArgs} [options]
	 * @returns {Observable<Response>}
	 *
	 * @memberOf HttpInterceptor
	 */
	put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
		var response = this.http.put(this.endpoint(url), body, this.interceptOptions(options));
		return this.intercept(response);
	}

	/**
	 * Will initiate a DELETE request to the provided url.
	 *
	 * @param {string} url
	 * @param {RequestOptionsArgs} [options]
	 * @returns {Observable<Response>}
	 *
	 * @memberOf HttpInterceptor
	 */
	delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
		var response = this.http.delete(this.endpoint(url), this.interceptOptions(options));
		return this.intercept(response);
	}

	/**
	 * Will return the full URL for the specified resource.
	 *
	 * @param {string} resource
	 * @returns
	 *
	 * @memberOf HttpInterceptor
	 */
	endpoint(resource: string) {
		if (resource.indexOf('://') > -1) {
			return resource;
		}
		return `${this.config.endpoint}/${resource}`;
	}

	private interceptOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
		if (!options) {
			return options;
		}
		options.headers = this.config.headers;
		return options;
	}

	private intercept(response: Observable<Response>): Observable<Response> {
		var sharable = response.share();

		let _: any = undefined;

		sharable.subscribe(_, (error: any) => {
			let errorBody = error._body || '';
			let message: string;

			if (!message) {
				return;
			}

			if (IsIt.json(errorBody)) {
				message = JSON.parse(errorBody);
			} else if (typeof errorBody !== 'string' || IsIt.html(errorBody)) {
				message = 'An unexpected error occured!';
			} else {
				message = errorBody;
			};

			this.logger.warn('message', message);
		});

		return sharable;
	}
}
