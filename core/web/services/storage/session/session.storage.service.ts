import {
	Injectable,
} from '@angular/core';

import {
	StorageService,
} from '../generics';

@Injectable()
export class SessionStorageService
	extends StorageService
	implements IStorageService {
	constructor() {
		super(sessionStorage);
	}
}
