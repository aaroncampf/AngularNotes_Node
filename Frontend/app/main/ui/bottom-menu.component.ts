import {Component} from '@angular/core';

@Component({
	selector: 'bottom-menu',
	template: `
		<main-context>
			<button class="btn btn-block">Add</button>
			<button class="btn btn-block">Remove</button>
		</main-context>
		<my-account-context>
			<my-account-component></my-account-component>
		</my-account-context>
	`
})

export class BottomMenuComponent {}