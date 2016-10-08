import {
	TestBed,
} from '@angular/core/testing';

import {
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

export class TestEnvironment {
	static init(options: { imports?: Array<any>, providers?: Array<any> }) {
		TestBed.resetTestEnvironment();
		TestBed.initTestEnvironment(
			BrowserDynamicTestingModule,
			platformBrowserDynamicTesting()
		);
		TestBed.configureTestingModule(options);
	}
}
