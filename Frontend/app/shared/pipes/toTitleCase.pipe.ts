import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'Capitalize'
})
export class Capitalize implements PipeTransform {
	public transform(value: string, args: string[]): any {
		return value.charAt(0).toUpperCase() + value.slice(1)
	}
}