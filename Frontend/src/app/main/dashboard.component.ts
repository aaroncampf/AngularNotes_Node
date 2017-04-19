import {Component} from '@angular/core';
@Component({
	selector: `dashboard-component`,
	template: `
	<div class="row">
		<small class="pull-left">Angular Bros <strong>CRM</strong></small>
		<div class="pull-right">
			<i [routerLink]="['/my-account']" class="glyphicon glyphicon-cog pull-right"></i>
		</div>		
	</div>
	`
})

export class DashboardComponent {

}