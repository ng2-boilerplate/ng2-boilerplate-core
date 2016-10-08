import {
	inject,
} from '@angular/core/testing';

import {
	SessionStorageService,
} from './session.storage.service';

import {
	StorageTest,
} from '../generics/storage.service.test';

import {
	TestEnvironment,
} from '../../../..//@/test';

describe('Session Storage Service', () => {
	let service: SessionStorageService;

	beforeEach(() => {
		TestEnvironment.init({
			providers: [
				SessionStorageService,
			],
		});
		inject([SessionStorageService], (injectedService: SessionStorageService) => {
			service = injectedService;
		})();
	});

	StorageTest.execute(() => { return service; });
});
