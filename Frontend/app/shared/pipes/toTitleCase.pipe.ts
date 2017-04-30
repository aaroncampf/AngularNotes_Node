import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
	name: 'toTitleCase'
})
export class ToTitleCaseKeys implements PipeTransform {
	public transform(value: string): any {
		if (!value) {
			return value;
		}
		return value.charAt(0).toUpperCase() + value.slice(1)
		// this.itemKeys.push(Object.itemKeys(obj)[i].charAt(0).toUpperCase() + Object.itemKeys(obj)[i].slice(1));
	}
}