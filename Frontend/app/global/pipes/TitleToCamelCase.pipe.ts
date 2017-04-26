//Todo If you ask WTF.. well.. that's a good question.
//todo Unhackify (maybe with sockets :)
export function keysToCamelCase(source: any): any {
	console.log('starting with', source);
	let sourceTemp = [];
	// Case: if source is an Array and not an Object
	if (Array.isArray(source)) {
		sourceTemp = source;
		source = source[0];
	}
	// this will be our final response
	let camelCased = {};

	// separate the TitleCase words so we can target the first one
	for (let key of Object.keys(source)) {

		// most likely will catch words with Capitals, unless maybe single letter var names like ABCDVarOne..
		let temp00 = key.match(/([A-Z][^\s]*)/g);
		temp00[0] = temp00[0].toLowerCase();
		let temp01 = '';
		for (let seg of temp00) {
			temp01 = temp01.concat(seg);
		}
		camelCased = Object.assign(camelCased, {[temp01]: source[key]});
	}
	// catch up with the array's we stashed earlier to make some new Objects to put back into an array.
	if (sourceTemp.length >= 1 ) {

		// cuz screw it that's why.
		source = [];
		for(let obj of sourceTemp) {
			let temp02 = {};
			let i = 0;

			// Case: the key is now lowercase, how do we get the values from the objects..
			for (let key of Object.keys(camelCased)) {
				temp02 = Object.assign(temp02, {[key]:obj[Object.keys(obj)[i]]});
				i++;
			}
			source.push(temp02);
		}
		// Success!!
		camelCased = source;
	}
	console.log('is it camelCased?',camelCased);
	return camelCased;
}

// ..two minutes from stack overflow
// http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
export function toProperCase(string: string): string {
	return string.replace(/\w\S*/g, function(string){return string.charAt(0).toUpperCase() + str.substr(1).toLowerCase();});
};

