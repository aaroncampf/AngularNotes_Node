import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../users/users.services';

@Component({
	selector: 'navigation-component',
	template: `
	<ul class="nav nav-tabs">
		<li class="tab" role="tab">
			<a (click)="changeView('companies')">Companies</a>
		</li>
		<li class="tab" role="tab">
			<a (click)="changeView('quotes')" >Quotes</a>
		</li>
		<li class="tab" role="tab">
			<a (click)="changeView('contacts')" >Contacts</a>
		</li>
		<li class="tab" role="tab">
			<a (click)="changeView('notes')" >Notes</a>
		</li>
	</ul>
	`
})

export class NavigationComponent {
	constructor(private router: Router,
				private usersService: UsersService){}

	public changeView(viewName: string): void {
		this.usersService.setTWTProp({viewContext: viewName});
		this.router.navigate([`/${viewName}`]);
	}
}