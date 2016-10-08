export class StorageTest {
	static execute(constructor: Function) {
		describe('(storage shared suite)', () => {
			let storage: IStorageService;
			let key = 'myKey';
			let complexObject = {
				myFloat: 4.2,
				myInt: 4,
				myString: 'string',
			};

			beforeEach(() => {
				storage = constructor();
			});

			it('should store string data', () => {
				storage.set(key, complexObject.myString);
				expect(storage.get<string>(key)).toBe(complexObject.myString);
			});

			it('should store numeric data', () => {
				storage.set(key, complexObject.myInt);
				expect(storage.get<number>(key)).toBe(complexObject.myInt);
			});

			it('should store complex object', () => {
				storage.set(key, complexObject);
				let storedData = storage.get<any>(key);
				expect(storedData).toEqual(complexObject);
			});

			it('should clear data', () => {
				expect(storage.keys.length).toBeGreaterThan(0);
				storage.clear();
				expect(storage.keys.length).toBe(0);
				expect(storage.isEmpty).toBeTruthy();
			});

			it('should store object keys seperately', () => {
				storage.store(complexObject);
				for (let key of Object.getOwnPropertyNames(complexObject)) {
					let item = storage.get(key);
					expect(item).toBe((<any>complexObject)[key]);
					expect(storage.contains(key)).toBeTruthy();
				}
				storage.clear();
			});
		});
	}
}
