import {
	MockServerRouter,
} from '../backend';

import {
	Placeholder,
} from './endpoints';

export let routeConfig = (router: MockServerRouter) => {
	// seed the placeholder endpoints (generic url, generic data)
	// used in tests for the HTTP interceptor
	Placeholder.endpoints(router);
};
