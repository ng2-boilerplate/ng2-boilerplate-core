///
/// Original implementation: https://github.com/vladvelici/ng2-mock-server
/// Adapted to suite the needs of Facility
///

// export const MOCK_SERVER_PROVIDERS: any[] = [
// 	MockSrvRouter,
// 	provide(XHRBackend, { useClass: MockSrvBackend }),
// ];

import {
	MockServerRouter,
} from './mock.server.router';

import {
	MockServerBackend,
} from './mock.server.connection';

export { MockServerRouter, MockServerBackend };

export * from './mock.helpers';
