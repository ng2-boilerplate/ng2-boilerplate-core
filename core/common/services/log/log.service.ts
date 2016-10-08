import {
	Injectable,
} from '@angular/core';

@Injectable()
export class LogService {
	/**
	 * Log a message and intercept the log data.
	 *
	 * @param {string} [message]
	 * @param {...any[]} data
	 *
	 * @memberOf LogService
	 */
	public log(message?: string, ...data: any[]) {
		console.log(message, data);
		this.interceptor('log', message, data);
	}

	/**
	 * Log a warning and intercept the log data.
	 *
	 * @param {string} [message]
	 * @param {...any[]} data
	 *
	 * @memberOf LogService
	 */
	public warn(message?: string, ...data: any[]) {
		console.warn(message, data);
		this.interceptor('warn', message, data);
	}

	/**
	 * Log a debug message and intercept the log data.
	 *
	 * @param {string} [message]
	 * @param {...any[]} data
	 *
	 * @memberOf LogService
	 */
	public debug(message?: string, ...data: any[]) {
		console.debug(message, data);
		this.interceptor('debug', message, data);
	}

	/**
	 * Log an info message and intercept the log data.
	 *
	 * @param {string} [message]
	 * @param {...any[]} data
	 *
	 * @memberOf LogService
	 */
	public info(message?: string, ...data: any[]) {
		console.info(message, data);
		this.interceptor('info', message, data);
	}

	/**
	 * Internal interceptor (switch) that decides what to do to the logged messages.
	 *
	 * @private
	 * @param {string} level
	 * @param {string} message
	 * @param {...any[]} data
	 *
	 * @memberOf LogService
	 */
	private interceptor(level: string, message: string, ...data: any[]) {
		// INTERCEPT LOGGER DATA
		switch (level) {
			default:
			// DEFAULT SHOULD BE GENERIC FOR ALL LOG TYPES
			// HENCE NO BREAK AFTER DEFAULT IS HIT
			case 'log':
				// SPECIFIC LOG INTERCEPTORS
				break;
			case 'warn':
				// SPECIFIC LOG INTERCEPTORS
				break;
			case 'debug':
				// SPECIFIC LOG INTERCEPTORS
			case 'info':
				// SPECIFIC LOG INTERCEPTORS
				break;
		}
	}
}
