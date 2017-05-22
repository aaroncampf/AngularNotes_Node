import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {StateService} from '../../../store/service/state.service';

@Component({
	selector: 'mobile-navigation-component',
	template: `
	<ul class="nav nav-tabs">
		<li class="tab" role="tab">
			<a (click)="navTo('/home')">Home</a>
		</li>
		<li class="tab" role="tab">
			<a (click)="navTo('/Companies')" >Companies</a>
		</li>
		<li class="tab" role="tab">
			<a (click)="navTo('/Contacts')" >Contacts</a>
		</li>
		<li class="tab" role="tab">
			<a (click)="navTo('/Quotes')" >Quotes</a>
		</li>
	</ul>
	`
})

export class MobileNavigationComponent {
	constructor(
		private router: Router,
		private stateService: StateService
	){}

	public navTo(url: string): void {
		this.stateService.dispatch(
			'NAVIGATION_GOTO', {
				view: url
			});
	}
}