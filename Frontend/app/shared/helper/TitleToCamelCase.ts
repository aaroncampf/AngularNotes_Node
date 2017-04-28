//todo Unhackify (maybe with sockets :)

//Todo Convert To PipeTransform
export function keysToCamelCase(source: any): any {
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

		// catch case: ID is turned to iD
		if (key === 'ID') {
			Object.assign(camelCased, {['id']: source[key]});
			continue;
		}
		camelCased = Object.assign(camelCased, {[key.match(/([A-Z][^\s]*)/g)[0].charAt(0).toLowerCase() + key.slice(1)]: source[key]});
	}
	// catch up with the array's we stashed earlier to make some new Objects to put back into an array.
	if (sourceTemp.length >= 1 ) {

		// cuz Im not wanting to make another temp.. is that lazy?
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
	return camelCased;
}

// ..two minutes from stack overflow
// http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
export function toProperCase(string: string): string {
	return string.replace(/\w\S*/g, function(string){return string.charAt(0).toLowerCase() + string.substr(1).toLowerCase()});
};

