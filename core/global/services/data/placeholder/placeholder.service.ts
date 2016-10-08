import {
	Injectable,
} from '@angular/core';

import {
	DataService,
} from '../generics/data.service';

import {
	ConfigurationService,
	HttpInterceptor,
	LogService,
} from '../../../../common';

import {
	PlaceholderProfile,
} from '../../../models/placeholder';

@Injectable()
export class PlaceholderService extends DataService {
	constructor(private config: ConfigurationService, http?: HttpInterceptor, logger?: LogService) {
		super(http, logger);
	}

	public placeholder(value: string) {
		return this.post('endpoint/placeholder', {
			data: value,
		}, PlaceholderProfile.mapperConfig);
	}
}
