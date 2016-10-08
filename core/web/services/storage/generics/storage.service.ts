import {
	IsIt,
} from '../../../../common/helpers';

export abstract class StorageService implements IStorageService {
	constructor(private storage: Storage) { }

	public get keys(): Array<string> {
		let result: Array<string> = [];

		for (let i = 0; i < this.storage.length; i++) {
			result.push(this.storage.key(i));
		}

		return result;
	};

	public get isEmpty(): boolean {
		return this.keys.length === 0;
	}

	public remove(key: string | Array<string>) {
		if (typeof key === 'string') {
			this.storage.removeItem(key);
		} else if (Array.isArray(key)) {
			for (var i = 0; i < key.length; i++) {
				if (typeof key[i] === 'string') {
					this.storage.removeItem(key[i]);
				} else {
					throw new Error('Key in index ' + i + ' is not a string');
				}
			}
		} else {
			throw new Error('Key must be a string or array for function remove(key || array)');
		}
	}

	public get(key: string, defaultValue: any = null) {
		if (typeof key !== 'string') {
			throw new Error('Key must be a string for function get(key)');
		}

		var value = this.storage.getItem(key);  // retrieve value

		if (value === null) {
			// Returns default value if key is not set, otherwise returns null
			return defaultValue;
		} else if (!isNaN(<number>(<any>value))) {
			return parseFloat(value);  // value was of type number
		} else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
			return value === 'true';  //value was of type boolean
		} else if (IsIt.json(value)) {
			return JSON.parse(value);
		}

		return value;
	}

	public set(key: string, value: any) {
		if (typeof key === 'string') {
			if (typeof value === 'object') {
				value = JSON.stringify(value);
			}

			this.storage.setItem(key, value);
		} else {
			throw new Error('Invalid arguments for function set(key, value) or function set(object)');
		}
	}

	public store(value: any) {
		if (typeof value === 'object' && !(value instanceof Array)) {
			for (var property in value) {
				this.storage.setItem(property, value[property]);
			}
		} else {
			throw new Error('Argument for function set(object) must be an object');
		}
	}

	public contains(key: string) {
		if (typeof key !== 'string') {
			throw new Error('Key must be a string for function contains(key)');
		}

		return this.keys.indexOf(key) !== -1;
	};

	public clear() {
		this.storage.clear();
	}
}
