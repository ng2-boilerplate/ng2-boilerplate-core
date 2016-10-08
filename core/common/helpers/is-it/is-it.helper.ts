/**
 * IsIt helps determine if strings are certain types or have certain meanings.
 * Example: json, html, date, etc...
 *
 * @export
 * @class IsIt
 */
export class IsIt {
	private static regexCollection: any = {
		html: /<[a-z][\s\S]*>/i,
	};

	/**
	 * Determine if a string is HTML/XML.
	 *
	 * @static
	 * @param {string} str
	 * @returns {boolean}
	 *
	 * @memberOf IsIt
	 */
	static html(str: string): boolean {
		return IsIt.regexCollection.html.test(str);
	};

	/**
	 * Determine if a string is a JSON serialized object.
	 *
	 * @static
	 * @param {string} str
	 * @returns {boolean}
	 *
	 * @memberOf IsIt
	 */
	static json(str: string): boolean {
		try {
			JSON.parse(str);
			return true;
		} catch (e) {
			return false;
		}
	};

	/**
	 * Determine if a string is a valid Date.
	 *
	 * @static
	 * @param {string} str
	 * @returns {boolean}
	 *
	 * @memberOf IsIt
	 */
	static date(str: string): boolean {
		let mSeconds = Date.parse(str);

		if (
			// check if valid date
			isNaN(mSeconds)
		) {
			return false;
		}

		return true;
	}
}
