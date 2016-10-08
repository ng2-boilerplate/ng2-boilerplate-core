import {
	inject,
} from '@angular/core/testing';

import {
	HttpModule,
} from '@angular/http';

import {
	DATA_TEST_PROVIDERS,
	TestEnvironment,
} from '../../../..//@/test';

import {
	PlaceholderService,
} from './placeholder.service';

import {
	AutomapperConfig,
} from '../../../../global/models/initialize';

describe('Placeholder Service', () => {
	let svc: PlaceholderService;

	beforeEach(() => {
		// intialize the test bed
		TestEnvironment.init({
			imports: [
				HttpModule,
			],
			providers: DATA_TEST_PROVIDERS.concat([PlaceholderService]),
		});
		// inject http interceptor instance before each test
		inject([PlaceholderService], (injectedSvc: PlaceholderService) => {
			svc = injectedSvc;
		})();
		AutomapperConfig.initialize();
	});

	it('should get identifier', (done) => {
		svc.placeholder('data').subscribe((res: IPlaceholder) => {
			expect(res).toBeDefined();
			expect(res.identifier).toBeDefined();
			expect(res.identifier.length).toBeGreaterThan(1);
			expect(res.identifier).toEqual('00fc38db-2a4d-4a02-a6c0-bc883e5102da');
			done();
		});
	});
});
