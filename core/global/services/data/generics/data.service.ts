import {
	Response,
} from '@angular/http';

import {
	Observable,
} from 'rxjs/Observable';

import 'rxjs/Rx';

import {
	HttpInterceptor,
	LogService,
} from '../../../../common';

export class DataService {
	private hasLogger: boolean;

	constructor(private http: HttpInterceptor, private logger?: LogService) {
		this.hasLogger = !!(<any>this.logger);
	}

	/**
	 * Perform a GET request for the specified resource.
	 *
	 * @template T
	 * @param {string} resource
	 * @returns {Observable<Response>}
	 *
	 * @memberOf DataService
	 */
	public get<T>(resource: string, mapConfig?: IMapConfig): Observable<T | any> {
		return this.http
			.get(resource)
			.map(res => this.mapData(res, mapConfig))
			.catch(this.errorHandler);
	};

	/**
	 * Perform a POST request for the specified resource.
	 *
	 * @template T
	 * @param {string} resource
	 * @param {T} data
	 * @returns {Observable<Response>}
	 *
	 * @memberOf DataService
	 */
	public post<T>(resource: string, data: T, mapConfig?: IMapConfig): Observable<T | any> {
		return this.http
			.post(resource, data)
			.map(res => this.mapData(res, mapConfig))
			.catch(this.errorHandler);
	}

	/**
	 * Perform a PUT request for the specified resource.
	 *
	 * @template T
	 * @param {string} resource
	 * @param {T} data
	 * @returns {Observable<Response>}
	 *
	 * @memberOf DataService
	 */
	public put<T>(resource: string, data: T, mapConfig?: IMapConfig): Observable<T | any> {
		return this.http
			.put(resource, data)
			.map(res => this.mapData(res, mapConfig))
			.catch(this.errorHandler);
	}

	/**
	 * Perform a DELETE request for the specified resource.
	 *
	 * @template T
	 * @param {string} resource
	 * @returns {Observable<Response>}
	 *
	 * @memberOf DataService
	 */
	public delete<T>(resource: string, mapConfig?: IMapConfig): Observable<T | any> {
		return this.http
			.delete(resource)
			.map(res => this.mapData(res, mapConfig))
			.catch(this.errorHandler);
	}

	protected mapData<T>(res: Response, mapConfig?: IMapConfig): T | any {
		if (!res.ok) {
			throw new Error(`Bad response: ${res.status} info: ${res.statusText}`);
		}

		let shouldMap = !!mapConfig && !!mapConfig.destinationKey && !!mapConfig.sourceKey;
		let pureData = res.json();

		return <T>(shouldMap ? automapper.map(mapConfig.sourceKey, mapConfig.destinationKey, pureData) : pureData);
	}

	protected errorHandler = (error: any) => {
		let message: string = '';

		if (error instanceof Response) {
			message = error.json().error || `Unkown server error: Message - ${error.statusText}; Code - ${error.status}`;
		} else {
			message = error || 'Unkown server error - No additional data...';
		}

		if (this.hasLogger && !!message) {
			this.logger.warn(message);
		}

		return Promise.reject(message);
	}
}
