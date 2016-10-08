import {
	Injectable,
} from '@angular/core';
import {
	Headers,
} from '@angular/http';

export interface IConfiguration {
	apiVersion: string;
	domain: string;
	port?: number;
	protocol: string;
	subDomain: string;
};

@Injectable()
export class ConfigurationService {
	private default: IConfiguration;
	private defaultHeaders: Headers;

	constructor() {
		this.default = {
			apiVersion: '3',
			domain: 'site.domain',
			port: 80,
			protocol: 'https://',
			subDomain: 'my',
		};

		this.defaultHeaders = new Headers();
		this.defaultHeaders.append('Content-Type', 'application/json');
	}

	/**
	 * Returns the endpoint generated based on the configuration.
	 *
	 * @readonly
	 * @type {string}
	 * @memberOf ConfigurationService
	 */
	public get endpoint(): string {
		// for readability
		let d = this.default;
		return `${d.protocol}${d.subDomain}.${d.domain}${!!d.port ? `:${d.port}` : ''}/api/${d.apiVersion}/`;
	}

	/**
	 * Returns the global required headers.
	 *
	 * @readonly
	 * @type {Headers}
	 * @memberOf ConfigurationService
	 */
	public get headers(): Headers {
		return this.defaultHeaders;
	}

	/**
	 * Set the access token.
	 *
	 *
	 * @memberOf ConfigurationService
	 */
	public set authorization(value: string) {
		let key = 'Authorization';
		this.defaultHeaders.delete(key);
		this.defaultHeaders.append(key, value);
	}

	/**
	 * Set API port.
	 *
	 *
	 * @memberOf ConfigurationService
	 */
	public set port(value: number | false) {
		this.default.port = !value ? undefined : value;
	}

	/**
	 * Set API sub domain.
	 *
	 *
	 * @memberOf ConfigurationService
	 */
	public set subDomain(value: string) {
		this.default.subDomain = value;
	}

	public get subDomain(): string {
		return this.default.subDomain;
	}

	/**
	 * Flag secure/unsecure HTTP protocol.
	 *
	 *
	 * @memberOf ConfigurationService
	 */
	public set secure(isSecure: boolean) {
		this.default.protocol = isSecure ? 'https://' : 'http://';
	}
}
