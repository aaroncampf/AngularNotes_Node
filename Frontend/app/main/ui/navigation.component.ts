import {Component} from '@angular/core';

@Component({
	selector: 'navigation-component',
	template: `
	<ul class="nav nav-tabs">
		<li class="tab" role="tab">
			<a [routerLink]="['/companies']">Companies</a>
		</li>
		<li class="tab" role="tab">
			<a [routerLink]="['/quotes']">Quotes</a>
		</li>
		<li class="tab" role="tab">
			<a [routerLink]="['/contacts']">Contacts</a>
		</li>
		<li class="tab" role="tab">
			<a [routerLink]="['/notes']">Notes</a>
		</li>
	</ul>
	`
})

export class NavigationComponent {
}