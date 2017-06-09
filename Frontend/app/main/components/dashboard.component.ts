import {Component} from '@angular/core';

@Component({
	selector: 'mobile-dashboard-component',
	template: `
	<div class="row">
		<small class="pull-right">Angular Bros <strong>CRM</strong></small>
		<div class="pull-left">
			<strong [routerLink]="['/Company-Details/company_id']">Current Company</strong>
			<button class="btn btn-sm btn-default dropdown-toggle" type="button" id="companyDropDown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
				Companies
				<span class="caret"></span>
			</button>
			<ul class="dropdown-menu" aria-labelledby="companyDropDown">
				<li>Company 1</li>
				<li>Company 1</li>
				<li>Company 1</li>
				<li>Company 1</li>
			</ul>	
		</div>
	</div>
	`
})

export class MobileDashboardComponent {

}