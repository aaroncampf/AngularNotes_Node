import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Company} from '../../models/company.model';
import {ModelService} from '../../../shared/services/model.service';
import {List, LIST_INITIAL_STATE} from '../../../forms/models/lists.model';
import {StateInstance} from '../../../store/models/state.model';

export interface Selectable {
	[id: string]: ObjState;
}

export interface ObjState {
	selected: boolean;
	detailsShown: boolean;
}

@Component({
	selector: 'side-menu',
	template: `
		<div class="row">
			<strong>Company Select</strong>
		</div>
		<div class="row" *ngIf="!!state.companiesReady" [formGroup]="companiesForm">
			<select class="form-control" [(ngModel)]="cache.selectedCompany"
					(ngModelChange)="action.emit({type: 'CACHE_SELECTED_COMPANY', payload: assignKey(selectedCompany.id,  {details: selectedCompany , state: {selected: true, details: false}})})"
					[ngModelOptions]="{standalone: true}">
				<option *ngFor="let company of cache.companiesList.items" [ngValue]="company">{{company?.name}}</option>
			</select>
			<span class="icon icon-plus"
				  (click)="action.emit({ type: 'SERVICE_COMPANY_CREATE', payload: {}}); action.emit({type: 'SERVICE_COMPANIES_GET', payload: {}})"></span>
			<input-component *ngFor="let question of cache.companiesList.questions" (action)="action.emit($event)"
							 [store]="question.store" [model]="selectedCompany[question.key]" [label]="question.label"
							 [control]="cache.companiesList.controls[question.key]"
							 (onBlur)="action.emit({type: 'SERVICE_COMPANY_SET', payload: {value: $event, id: selectedCompany.id, key: question.key}})"></input-component>
			<div class="row">
				<h6>Contacts:</h6>
				<list-component *ngIf="!!state.contactsReady" [itemsList]="cache.contactsList" [listItemsReady]="contactsReady"
								[form]="contactsForm" title="Contacts" listContext="contacts"
				></list-component>
			</div>
		</div>
	`,
})

export class SideMenuComponent implements OnChanges, OnInit {
	@Input()
	public state: StateInstance = <StateInstance>{};
	@Input()
	public cache: any = {};
	@Input()
	public companiesForm: FormGroup;
	@Input()
	public contactsForm: FormGroup;
	@Output()
	public action: EventEmitter<{}> = new EventEmitter<{}>();

	constructor(private models: ModelService) {
	}

	public ngOnInit(): void {


	}

	public ngOnChanges(simpleChanges: SimpleChanges): void {
			if(simpleChanges['cache'].firstChange && this.cache.companiesList) this.action.emit({type: 'CACHE_SIDE-MENU_INITIAL-COMPANY', payload: {selectedCompany: this.cache.companiesList.items[0]}});
		if(!simpleChanges['state']){
			this.action.emit({type: 'STATE_SIDE-MENU_CHANGING', payload: {companiesReady: false}});
			console.log('ONCHANGES sidemenu', simpleChanges);
			this.action.emit({type: 'STATE_SIDE-MENU_CHANGE_DONE', payload: {companiesReady: true}});
		}
	}

	public newCompany(): void {
		const newModel = this.models.newModel('companies');
		this.action.emit({type: 'CACHE_SELECTED_NEW-COMPANY', payload: { selectedCompany: newModel}});
	}

	public assignKey(key, val): any {
		return {[key]: val};
	}
}

export interface InputStore {
	[name: string]: any
}