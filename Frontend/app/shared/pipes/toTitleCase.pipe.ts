import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
	name: 'toTitleCase'
})
export class ToTitleCaseKeys implements PipeTransform {
	public transform(value: string): any {
		return value.charAt(0).toUpperCase() + value.slice(1)
	}
}