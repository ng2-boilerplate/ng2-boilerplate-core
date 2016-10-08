import {
	Request,
} from '@angular/http';

import {
	badRequest,
	json,
	MockServerRouter,
} from '../../backend';

import {
	HTTP_CONSTANTS,
} from '../test.constants';

import {
	ConfigurationService,
} from '../../../common';

export class Placeholder {
	static endpoints = (router: MockServerRouter) => {
		let config = new ConfigurationService();

		router.post(`${config.endpoint}/endpoint/placeholder`, (req: Request, ...params: string[]) => {
			return json(200, {
				id: '00fc38db-2a4d-4a02-a6c0-bc883e5102da',
			});
		});

		router.get(`${HTTP_CONSTANTS.placeholderEndpoint}/:id`, (req: Request, id: string) => {
			let identifier = parseInt(id);
			let invalid = isNaN(identifier);

			return invalid ?
				badRequest :
				json(200, {
					body: 'Well, as you can cleary see this is not going away',
					id: identifier,
					title: 'Some title goes here',
					userId: 1,
				});
		});

		router.post(HTTP_CONSTANTS.placeholderEndpoint, (req: Request, ...params: string[]) => {
			let body: IPostMock = req.json();
			let invalid = !isNaN(body.id) &&
				isNaN(body.userId) &&
				body.title.length === 0 &&
				body.body.length === 0;

			body.id = 101;
			return invalid ?
				badRequest :
				json(200, body);
		});

		router.put(`${HTTP_CONSTANTS.placeholderEndpoint}/:id`, (req: Request, id: string) => {
			let body: IPostMock = req.json();
			let identifier = parseInt(id);

			let invalid = isNaN(identifier) &&
				isNaN(body.userId) &&
				body.title.length === 0 &&
				body.body.length === 0;

			body.id = identifier;
			return invalid ?
				badRequest :
				json(200, body);
		});

		router.delete(`${HTTP_CONSTANTS.placeholderEndpoint}/:id`, (req: Request, id: string) => {
			let identifier = parseInt(id);

			let invalid = isNaN(identifier);
			return invalid ?
				badRequest :
				json(200, {
					succesful: true,
				});
		});
	};
}
