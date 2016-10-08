import {
	IsIt,
} from './is-it.helper';

describe('IsIt Helper', () => {
	let fake = {
		html: (valid: true): string => {
			return valid ?
				`
					<p>${chance.paragraph({ sentences: 1 })}</p>
					<h1>${chance.sentence({ words: 5 })}</h1>
					<div>
						<div>${chance.paragraph({ sentences: 3 })}</div>
					</div>
				`
				:
				chance.sentence({ words: 5 });
		},
		json: (valid: true): string => {
			if (valid) {
				return JSON.stringify({
					age: chance.age(),
					birthday: chance.birthday(),
					name: chance.name(),
					ssn: chance.ssn(),
				});
			} else {
				return chance.paragraph({ sentences: Math.random() * 10 << 0 });
			}
		},
	};

	let shouldIdentify = (what: string, generator: Function, valid: boolean = true, howManyTimes: number = 10): void => {
		for (let i = 0; i < howManyTimes; i++) {
			it(`should ${!valid ? 'invalidate' : 'validate'} ${what} strings #${i + 1}`, () => {
				let randomData = generator(valid);
				expect((<any>IsIt)[what.toLowerCase()](randomData)).toBe(valid);
			});
		}
	};

	shouldIdentify('JSON', fake.json, true);
	shouldIdentify('JSON', fake.json, false);

	shouldIdentify('HTML', fake.html, true);
	shouldIdentify('HTML', fake.html, false);

	let dateStringCheck = (type: string = '', humanFriendly: boolean = true) => {
		if (humanFriendly) {
			it(`should validate ${type} date strings`, () => {
				let randomDate = new Date('2032-06-12T13:42:23.798Z');
				let methodKey = `to${type}String`;
				let dateStr = (<any>randomDate)[methodKey]();
				expect(IsIt.date(dateStr)).toBeTruthy();
				expect(dateStr).toBe((<any>new Date(dateStr))[methodKey]());
			});
		}
	};
	dateStringCheck('UTC');
	dateStringCheck('ISO');
	dateStringCheck('Date');
	dateStringCheck();
});
