import {
	Injectable,
} from '@angular/core';

import {
	StorageService,
} from '../generics';

@Injectable()
export class LocalStorageService
	extends StorageService
	implements IStorageService {
	constructor() {
		super(localStorage);
	}
}
