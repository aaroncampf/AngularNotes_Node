import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import {StateService} from '../../../store/service/state.service';

@Component({
	selector: 'mobile-navigation-component',
	template: `
	<ul class="nav nav-tabs">
		<li class="tab" role="tab">
			<a (click)="action.emit({type: 'NAVIGATION_COMPANIES_FROM_NAV', payload: {sideMenu: true, modelContext: 'companies'}})"><span class="icon icon-office"></span></a>
		</li>
		<li class="tab" role="tab">
			<a (click)="navTo('/Contacts')" ><span class="icon icon-user-tie"></span></a>
		</li>
		<li class="tab" role="tab">
			<a (click)="navTo('/Quotes')" ><span class="icon icon-bubble2"></span></a>
		</li>
	</ul>
	`
})

export class MobileNavigationComponent {
	@Output()
	action: EventEmitter<any> = new EventEmitter<any>();
	constructor(
		private router: Router,
		private stateService: StateService
	){}

	public navTo(url: string): void {
			this.router.navigate([url]);
		this.stateService.dispatch(
			'NAVIGATION_GOTO', {
				view: url
			});
	}
}