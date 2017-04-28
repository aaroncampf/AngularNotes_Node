import {Component} from '@angular/core';

@Component({
	selector: 'navigation-component',
	template: `
	<ul class="nav nav-tabs">
		<li class="tab" role="tab">
			<a [routerLink]="['/companies/company-list']">Companies</a>
			<!--<a [routerLink]="['/companies']">Companies</a>-->
		</li>
		<li class="tab" role="tab">
			<a [routerLink]="['/quotes/quote-list']">Quotes</a>
			<!--<a [routerLink]="['/quotes']">Quotes</a>-->
		</li>
		<li class="tab" role="tab">
			<a [routerLink]="['/contacts/contact-list']">Contacts</a>
			<!--<a [routerLink]="['/contacts']">Contacts</a>-->
		</li>
		<li class="tab" role="tab">
			<a [routerLink]="['/notes/note-list']">Notes</a>
			<!--<a [routerLink]="['/notes']">Notes</a>-->
		</li>
	</ul>
	`
})

export class NavigationComponent {
}