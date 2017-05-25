import {Component, EventEmitter, Input, OnChanges, Output,} from '@angular/core';
import {CRMType} from '../models/crm-models.type';
import {CRMState, StateInstance} from '../../store/models/state.model';

@Component({
	selector: 'mobile-dashboard-component',
	template: `
		<div class="row" *ngIf="!!state.dashboardReady">
			<small class="pull-right">Angular Bros <strong>CRM</strong></small>
			<button class="add btn btn-block" (click)="action.emit({type: 'STATE_TOGGLE_BOTTOM_MENU', payload: {bottomMenu: true, bottomMenuContext:'options'}})">More Options . . 
			</button>
			<h6 *ngIf="!!selected" class="pull-right"
				(click)="action.emit({type: 'NAVIGATE_DETAILS_FROM_DASHBOARD', payload: {selected: selected, origin: 'dashboard'}})">
				<strong>Current:</strong> {{selected.name}}</h6>
			<div>
				<i (click)="action.emit({type: 'STATE_MY_ACCOUNT_TOGGLE', payload: {bottomMenu: !bottomMenu, bottomMenuContext: 'account'}})"
				   class="glyphicon glyphicon-cog pull-right"></i>
			</div>
			<button class="back pull-left btn btn-lg" (click)="action.emit({type: 'STATE_SIDE_MENU_TOGGLE', payload: {sideMenu: !state.sideMenu, sideMenuContext: 'companies' }})">Menu
			</button>
		</div>
	`
})

export class MobileDashboardComponent {
	@Input()
	public bottomMenu: boolean = false;
	@Input()
	public sideMenu: boolean = false;
	@Input()
	public state: StateInstance = {};
	@Input()
	public selected: CRMType = <CRMType>{};
	@Output()
	public action: EventEmitter<any> = new EventEmitter<any>();

}