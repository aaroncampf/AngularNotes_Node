import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
	name: 'selectByID'
})
export class SelectByID implements PipeTransform {
	transform(args: any[]): any {
		if(!Array.isArray(args[0])) return console.log('Error with parameter in SelectID Pipe');
		for (let item of args[0]) {
			if (item.id === args[1]) return item;
		}
		return console.log('Error with parameter in SelectID Pipe');
	}
}