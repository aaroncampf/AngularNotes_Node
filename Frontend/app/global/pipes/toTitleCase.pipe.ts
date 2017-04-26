import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
	name: 'toTitleCase'
})
export class ToTitleCase implements PipeTransform {
	transform(value: string, args: string[]): any {
		if (!value) {
			return value;
		}
		return value.charAt(0).toUpperCase() + value.slice(1)
		// this.keys.push(Object.keys(obj)[i].charAt(0).toUpperCase() + Object.keys(obj)[i].slice(1));
	}
}