import {
	Connection,
	ConnectionBackend,
} from '@angular/http/src/interfaces';
import {
	ReadyState,
	ResponseOptions,
	Request,
	Response,
} from '@angular/http';
import {
	ReplaySubject,
} from 'rxjs/Rx';
import {
	Injectable,
} from '@angular/core';
import {
	MockServerRouter,
} from './mock.server.router';

export class MockServerConnection implements Connection {
	public readyState: ReadyState;
	public response: ReplaySubject<any> = new ReplaySubject(1);

	constructor(public request: Request,
		private baseResponseOptions: ResponseOptions,
		private router: MockServerRouter) {

		this.router.serve(request).then(
			(res: ResponseOptions) => {
				res = this.baseResponseOptions.merge(res);
				this.response.next(new Response(res));
				this.response.complete();
			},
			(err: any) => {
				this.response.error(err);
			}
		);
	}
}

/**
 * MockSrvBackend is an XHRBackend for angular2 that simulates a server. It's
 * purpose is enabling the implementation of front-ends when a back-end is not
 * (yet) available.
 */
@Injectable()
export class MockServerBackend implements ConnectionBackend {
	constructor(private baseResponseOptions: ResponseOptions, private router: MockServerRouter) {
	};

	createConnection(request: Request): MockServerConnection {
		return new MockServerConnection(request, this.baseResponseOptions, this.router);
	}
}
