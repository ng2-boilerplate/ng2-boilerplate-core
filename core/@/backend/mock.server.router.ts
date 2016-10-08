import {
	ResponseOptions,
	Request,
	RequestMethod,
} from '@angular/http';

import {
	Injectable,
} from '@angular/core';

import {
	pathtoRegexp,
} from './mock.regex';

import {
	routeConfig,
} from '../test';

export type RouteCallback = (req: Request, ...params: string[]) => Promise<ResponseOptions>;

class Route {
	static clearQueryString(url: string): string {
		let qsindex = url.indexOf('?');
		if (qsindex >= 0) {
			url = url.split('?')[0];
		}
		return url;
	}

	constructor(public method: RequestMethod, public regex: RegExp, public callback: RouteCallback) { }

	/** Test if the route matches the request. */
	matches(req: Request): boolean {
		if (this.method !== req.method) {
			return false;
		}
		let routingUrl = Route.clearQueryString(req.url);
		return this.regex.test(routingUrl);
	}

	/** Run the route callback on the request. Make sure matches(req) == true!! */
	serve(req: Request): Promise<ResponseOptions> {
		let args = <string[]>this.regex.exec(Route.clearQueryString(req.url));
		args.splice(0, 1);
		return this.callback(req, ...args);
	}
}

/**
    Router that helps setup a mock back-end.

    Usage is pretty simple.

    Example:

      router.post('/posts/:title', (req : Request, title : string) : Promise<ResponseOptions> {
          // your route implementation
      });
*/
@Injectable()
export class MockServerRouter {
	private routes: Route[] = [];
	private promise: Promise<void>;
	private resolve: () => void;

	constructor() {
		this.promise = new Promise<void>((resolve, reject) => {
			this.resolve = resolve;
		});

		if (!!routeConfig) {
			this.setup(routeConfig);
		}
	}

	/** Set the router as ready. */
	ready() {
		this.resolve();
	}

	/** Setup the router without explicitly calling ready(). */
	setup(callback: (router: MockServerRouter) => void) {
		callback(this);
		this.ready();
	}

	serve(req: Request): Promise<ResponseOptions> {
		return this.promise.then(() => {
			let i: number;
			for (i = 0; i < this.routes.length; i++) {
				if (this.routes[i].matches(req)) {
					let res = this.routes[i].serve(req);
					return res;
				}
			}

			let method: string = (<any>RequestMethod)[req.method];

			return Promise.reject<ResponseOptions>(new ResponseOptions({
				status: 404,
				statusText: `HTTP ${method}: ${req.url} - not implemented.`,
			}));
		});
	}

	addRoute(method: RequestMethod, path: string | RegExp, callback: RouteCallback) {
		let expr: RegExp = <RegExp>pathtoRegexp(path, [], {});
		this.routes.push(new Route(method, expr, callback));
	}

	put(path: string | RegExp, callback: RouteCallback) {
		this.addRoute(RequestMethod.Put, path, callback);
	}

	post(path: string | RegExp, callback: RouteCallback) {
		this.addRoute(RequestMethod.Post, path, callback);
	}

	get(path: string | RegExp, callback: RouteCallback) {
		this.addRoute(RequestMethod.Get, path, callback);
	}

	delete(path: string | RegExp, callback: RouteCallback) {
		this.addRoute(RequestMethod.Delete, path, callback);
	}

	options(path: string | RegExp, callback: RouteCallback) {
		this.addRoute(RequestMethod.Options, path, callback);
	}

	patch(path: string | RegExp, callback: RouteCallback) {
		this.addRoute(RequestMethod.Patch, path, callback);
	}

	head(path: string | RegExp, callback: RouteCallback) {
		this.addRoute(RequestMethod.Head, path, callback);
	}
}
