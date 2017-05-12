import {Component} from '@angular/core';
@Component({
	selector: `dashboard-component`,
	template: `
	<div class="row">
		<small class="pull-right">Angular Bros <strong>CRM</strong></small>
		<div>
			<i [routerLink]="['/my-account']" class="glyphicon glyphicon-cog pull-right"></i>
		</div>
		<button class="pull-left btn btn-lg" [routerLink]="['../']">Back</button>
	</div>
	`
})

export class DashboardComponent {

}