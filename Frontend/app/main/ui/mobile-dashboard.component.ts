import {Component, EventEmitter, Input, OnChanges, Output,} from '@angular/core';
import {CRMState, STATE_INITIAL_STATE} from '../../store/models/state.model';

@Component({
	selector: 'mobile-dashboard-component',
	template: `
	<div class="row" *ngIf="state$.dataReady">
		<small class="pull-right">Angular Bros <strong>CRM</strong></small>
		<button [routerLink]="['/create']" class="add btn btn-block" (click)="action.emit('CREATE_CONTEXT', {formContext: state$.viewContext})">Add New {{state$.viewContext}} </button>
		<h6 *ngIf="!!state$.focused" class="pull-right" (click)="action.emit({type: 'NAVIGATE_DETAILS', payload: {selected: state$.selected}})"><strong>Current:</strong> {{state$.selected.name}}</h6>
		<div>
			<i (click)="action.emit({type: 'MY_ACCOUNT_TOGGLE', payload: {}})" class="glyphicon glyphicon-cog pull-right"></i>
		</div>
		<button class="back pull-left btn btn-lg" (click)="action.emit({type: 'SIDE_MENU_TOGGLE', payload: {}})">Menu</button>
	</div>
	`
})

export class MobileDashboardComponent implements OnChanges {
	@Input()
	public state$: CRMState = <CRMState>STATE_INITIAL_STATE;
	@Output()
	public action: EventEmitter<any> = new EventEmitter<any>();

	public ngOnChanges(): void {
		console.log('changed');
	}
}