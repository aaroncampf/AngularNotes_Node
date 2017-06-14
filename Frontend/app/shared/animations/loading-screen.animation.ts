// taken from https://codepen.io/IvanKhartov/pen/KmgzpX
import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
@Component({
	selector: `data-loading-screen`,
	animations: [
		trigger('flyInOut', [
			state('in', style({opacity: 1, transform: 'translateX(0)'})),
			transition('void => *', [
				style({
					opacity: 0,
					transform: 'translateX(-100%)'
				}),
				animate('2s ease-in')
			]),
			transition('* => void', [
				animate('2s 0.1s ease-out', style({
					opacity: 0,
					transform: 'translateX(100%)'
				}))
			])
		])
	],
	template: `
	<div class="diamonds">
		<div class="diamond diamond-1"></div>
		<div class="diamond diamond-2"></div>
		<div class="diamond diamond-3"></div>
		<div class="diamond diamond-4"></div>
	</div>
	`,
	host: {'[@flyInOut]': ''}
})

export class DiamondLoaderComponent {}