import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
	selector: 'bottom-menu',
	template: `
		<h2>Bottom Menu</h2>
		<main-context *ngIf="state.bottomMenuContext === 'options'">
			<button class="btn btn-block" [routerLink]="['/create']">Add</button>
			<button class="btn btn-block">Remove</button>
		</main-context>s
		<my-account-context *ngIf="state.bottomMenuContext === 'account'">
			<my-account-component></my-account-component>
		</my-account-context>
	`
})

export class BottomMenuComponent implements OnChanges {
	@Input()
	public state: any;

	public ngOnChanges( simpleChanges: SimpleChanges){
		// console.log('BOTTOM MENU',this.state, simpleChanges);

	}

	//todo Action Navigation
}
