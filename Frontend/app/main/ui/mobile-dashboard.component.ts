import {Component, EventEmitter, Input, OnChanges, Output,} from '@angular/core';
import {CRMType} from '../models/crm-models.type';

@Component({
	selector: 'mobile-dashboard-component',
	template: `
		<div class="row" *ngIf="dashboardReady">
			<small class="pull-right">Angular Bros <strong>CRM</strong></small>
			<button [routerLink]="['/create']" class="add btn btn-block"
					(click)="action.emit('CREATE_CONTEXT', {formContext: viewContext})">Add New {{viewContext}}
			</button>
			<h6 *ngIf="!!selected" class="pull-right"
				(click)="action.emit({type: 'NAVIGATE_DETAILS', payload: {selected: selected}})">
				<strong>Current:</strong> {{selected.name}}</h6>
			<div>
				<i (click)="action.emit({type: 'MY_ACCOUNT_TOGGLE', payload: {bottomMenu: !bottomMenu, viewContext: 'accounts'}})"
				   class="glyphicon glyphicon-cog pull-right"></i>
			</div>
			<button class="back pull-left btn btn-lg"
					(click)="action.emit({type: 'STATE_SIDE_MENU_TOGGLE', payload: {sideMenu: !sideMenu, viewContext: 'companies' }})">
				Menu
			</button>
		</div>
	`
})

export class MobileDashboardComponent implements OnChanges {
	@Input()
	public bottomMenu: boolean = false;
	@Input()
	public sideMenu: boolean = false;
	@Input()
	public dashboardReady: boolean = false;
	@Input()
	public viewContext: string = null;
	@Input()
	public createContext: CRMType = <CRMType>{};
	@Input()
	public selected: CRMType = <CRMType>{};
	@Output()
	public action: EventEmitter<any> = new EventEmitter<any>();

	public ngOnChanges(): void {
		console.log('dashboard changed');
	}
}