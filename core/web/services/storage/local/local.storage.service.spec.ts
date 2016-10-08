import {
	inject,
} from '@angular/core/testing';

import {
	LocalStorageService,
} from './local.storage.service';

import {
	StorageTest,
} from '../generics/storage.service.test';

import {
	TestEnvironment,
} from '../../../..//@/test';

describe('Local Storage Service', () => {
	let service: LocalStorageService;

	beforeEach(() => {
		TestEnvironment.init({
			providers: [
				LocalStorageService,
			],
		});
		inject([LocalStorageService], (injectedService: LocalStorageService) => {
			service = injectedService;
		})();
	});

	StorageTest.execute(() => { return service; });
});
