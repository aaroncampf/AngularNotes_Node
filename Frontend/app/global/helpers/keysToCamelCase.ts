//Todo If you ask WTF.. well.. that's a good question.
export function keysToCamelCase(source: any): any {
	let sourceTemp = [];
	if (Array.isArray(source)) {
		sourceTemp = source;
		source = source[0];
	}
	let camelCased = {};
	for (let key of Object.keys(source)) {
		//todo Unhackify (maybe with sockets :)
		let temp00 = key.match(/([A-Z][^\s]*)/g);
		temp00[0] = temp00[0].toLowerCase();
		let temp01 = '';
		for (let seg of temp00) {
			temp01 = temp01.concat(seg);
		}
		camelCased = Object.assign(camelCased, {[temp01]: source[key]});
	}
	if (sourceTemp.length >= 1 ) {
		source = [];
		for(let obj of sourceTemp) {
			let temp02 = {};
			let i = 0;
			for (let key of Object.keys(camelCased)) {
				temp02 = Object.assign(temp02, {[key]:obj[Object.keys(obj)[i]]});
				i++;
			}

			source.push(temp02);
		}
		camelCased = source;
	}
		console.log('camelCased?',camelCased);
	return camelCased;
}