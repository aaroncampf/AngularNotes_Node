import {Component, EventEmitter, Input, OnChanges, Output,} from '@angular/core';
import {CRMType} from '../models/crm-models.type';

@Component({
	selector: 'mobile-dashboard-component',
	template: `
			<small class="pull-right">Angular Bros <strong>CRM</strong></small>
	`
})

export class MobileDashboardComponent {
	@Input()
	public bottomMenu: boolean = false;
	@Input()
	public sideMenu: boolean = false;
	@Input()
	public selected: CRMType = <CRMType>{};
	@Output()
	public action: EventEmitter<any> = new EventEmitter<any>();

}