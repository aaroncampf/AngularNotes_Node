import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
	name: 'lastIndexed'
})

export class LastIndexed implements PipeTransform {

	public transform(value: any[]): any {
		if (!Array.isArray(value)) return value;
		return  value[value.length - 1];
	}
}