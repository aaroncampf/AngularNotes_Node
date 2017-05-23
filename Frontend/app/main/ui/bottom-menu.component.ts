import {Component, Input} from '@angular/core';

@Component({
	selector: 'bottom-menu',
	template: `
		<h2>Bottom Menu</h2>
		<main-context *ngIf="viewContext === 'menu'">
			<button class="btn btn-block">Add</button>
			<button class="btn btn-block">Remove</button>
		</main-context>
		<my-account-context *ngIf="viewContext === 'account'">
			<my-account-component></my-account-component>
		</my-account-context>
	`
})

export class BottomMenuComponent {
	@Input()
	viewContext: string;
}