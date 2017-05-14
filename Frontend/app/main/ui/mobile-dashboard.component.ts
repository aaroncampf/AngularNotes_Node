import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Action} from '../helpers/util';
@Component({
	selector: 'mobile-dashboard-component',
	template: `
	<div class="row">
		<small class="pull-right">Angular Bros <strong>CRM</strong></small>
		<button [routerLink]="['/forms/create']" class="add btn btn-block" (click)="action.emit('CREATE_CONTEXT', {formContext: viewContext})">Add New {{viewContext}} </button>
		<h6 *ngIf="!!selected" class="pull-right" (click)="action.emit({type: 'NAVIGATE_DETAILS', payload: selected})"><strong>Current:</strong> {{selected.name}}</h6>
		<div>
			<i (click)="action.emit($emit)" class="glyphicon glyphicon-cog pull-right"></i>
		</div>
		<button class="back pull-left btn btn-lg" (click)="toggleMenu.emit({type: 'SIDE_MENU_TOGGLE', payload: {}})">Menu</button>
	</div>
	`
})

export class MobileDashboardComponent {
	@Input()
	public viewContext;
	@Input()
	public selected;
	@Output()
	public toggleMenu: EventEmitter<string> = new EventEmitter<string>();
	@Output()
	public action: EventEmitter<Action> = new EventEmitter<Action>();
}