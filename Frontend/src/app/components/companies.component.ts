import {Component} from '@angular/core';

@Component({
	selector: 'companies-component',
	template: `		
	<div class="col-xs-offset-1 col-xs-7">
		<div class="row">
			<ul class="nav nav-tabs">
				<li [class.active]="tab === COMPANY">
					<a class="tab" [routerLink]="[COMPANY]">
						<tab-heading>Company</tab-heading>
					</a>
				</li>
				<li [class.active]="tab === CONTACT">
					<a class="tab" [routerLink]="[CONTACT]">
						<tab-heading>Contacts</tab-heading>
					</a>
				</li>
				<li [class.active]="tab === NOTES">
					<a class="tab" [routerLink]="[NOTES]">
						<tab-heading>Notes</tab-heading>
					</a>
				</li>
				<li [class.active]="tab === QUOTES">
					<a class="tab" [routerLink]="[QUOTES]">
						<tab-heading>Quotes</tab-heading>
					</a>
				</li>
			</ul>
		</div>
	</div>
	`
})

export class CompaniesComponent {

}