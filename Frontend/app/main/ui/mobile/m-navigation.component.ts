import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

@Component({
	selector: 'mobile-navigation-component',
	template: `
	<ul class="nav nav-tabs">
		<li class="tab" role="tab">
			<a (click)="changeView('main')">Home</a>
		</li>
		<li class="tab" role="tab">
			<a (click)="changeView('crm')" >CRM</a>
		</li>
	</ul>
	`
})

export class MobileNavigationComponent {
	constructor(
		private router: Router,
		private _store: Store<any>
	){}

	public changeView(viewName: string): void {
		this._store.dispatch({
			type:'CHANGE_VIEW',
			payload: {
				view: viewName}
		});
		this.router.navigate([`/${viewName}`]);
	}
}