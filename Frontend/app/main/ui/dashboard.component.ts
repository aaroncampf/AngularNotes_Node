import {Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
	selector: `m-dashboard-component`,
	template: `
	<div class="row">
		<small class="pull-right">Angular Bros <strong>CRM</strong></small>
		<button class="add btn btn-block" (click)="newTouched.emit('new' + viewContext)">Add New {{viewContext}} </button>
		<div>
			<i [routerLink]="['/my-account']" class="glyphicon glyphicon-cog pull-right"></i>
		</div>
		<button class="back pull-left btn btn-lg" (click)="toggleMenu.emit('menuToggled')">Menu</button>
	</div>
	`
})

export class MDashboardComponent {
	@Input()
	public viewContext;
	@Output()
	public toggleMenu: EventEmitter<string> = new EventEmitter<string>();
	@Output()
	public newTouched: EventEmitter<string> = new EventEmitter<string>();
}