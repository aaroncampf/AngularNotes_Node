import {Component} from '@angular/core';

@Component({
	selector: 'mobile-dashboard-component',
	template: `
	<div class="row">
		<button class="btn-info pull-left" [routerLink]="['../']">Back</button>
		<small class="pull-right">Angular Bros <strong>CRM</strong></small>
	</div>
	`
})

export class MobileDashboardComponent {

}