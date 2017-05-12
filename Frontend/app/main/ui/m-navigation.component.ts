import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../users/users.services';

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
	constructor(private router: Router,
				private usersService: UsersService){}

	public changeView(viewName: string): void {
		this.usersService.setTWTProp({viewContext: viewName});
		this.router.navigate([`/${viewName}`]);
	}
}