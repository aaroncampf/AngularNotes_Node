import {Component} from '@angular/core';
@Component({
	selector: 'side-menu',
	template: `
	<div class="row">
		<ul class="nav nav-tabs nav-tabs-justified">
			<li class="tab" role="tab">
				<a [routerLink]="['/Companies']"><span class="icon icon-office"></span></a>
			</li>
			<li class="tab" role="tab">
				<a [routerLink]="['/Contacts']" ><span class="icon icon-user-tie"></span></a>
			</li>
			<li class="tab" role="tab">
				<a [routerLink]="['/Quotes']" ><span class="icon icon-bubble2"></span></a>
			</li>
		</ul>
	</div>
	`

})
export class SideMenuComponent {

}