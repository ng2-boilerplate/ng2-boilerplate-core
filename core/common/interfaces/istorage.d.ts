declare interface IStorageService {
	/**
	 * Return an array collection with all the storage keys available.
	 *
	 * @type {Array<string>}
	 * @memberOf IStorageService
	 */
	keys: Array<string>;
	/**
	 * Checks if the storage is empty or not.
	 *
	 * @type {boolean}
	 * @memberOf IStorageService
	 */
	isEmpty: boolean;
	/**
	 * Checks if the specified key is found in the storage.
	 *
	 * @param {string} key
	 * @returns {boolean}
	 *
	 * @memberOf IStorageService
	 */
	contains(key: string): boolean;
	/**
	 * Clear current storage data.
	 *
	 *
	 * @memberOf IStorageService
	 */
	clear(): void;
	/**
	 * Get the value for a specific key or the default value if the key is not present.
	 *
	 * @template T
	 * @param {string} key
	 * @param {*} [defaultValue]
	 * @returns {T}
	 *
	 * @memberOf IStorageService
	 */
	get<T>(key: string, defaultValue?: any): T;
	/**
	 * Set the value for a specific key.
	 *
	 * @template T
	 * @param {string} key
	 * @param {*} value
	 * @returns {T}
	 *
	 * @memberOf IStorageService
	 */
	set<T>(key: string, value: any): T;
	/**
	 * Stores complex objects by using the member names as keys.
	 *
	 * @template T
	 * @param {Object} value
	 *
	 * @memberOf IStorageService
	 */
	store<T>(value: Object): void;
}
