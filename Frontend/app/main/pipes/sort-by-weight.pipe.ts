import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
	name: 'sort-by-weight'
})
export class SortByWeightPipe implements PipeTransform {
	public transform(val) {
		console.log('pipe', val);
		return val.sort((a,b) => {
			if (a.weight > b.weight) {
				return 1;
			}
			if (a.weight < b.weight) {
				return -1;
			}
		})
	}
}