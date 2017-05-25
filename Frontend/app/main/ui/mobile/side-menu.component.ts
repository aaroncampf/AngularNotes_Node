import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Company} from '../../models/company.model';
import {ModelService} from '../../../shared/services/model.service';
import {StateInstance} from '../../../store/models/state.model';
import {UIService} from '../../services/ui.service';

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
		<div class="row" *ngIf="!!state$.companiesListReady" [formGroup]="cache$.companiesList.form">
			<select class="form-control" [(ngModel)]="selectedCompany"
					(ngModelChange)="action.emit({type: 'CACHE_SELECTED_COMPANY', payload:{selectedCompany: selectedCompany}}); action.emit({ type:'STATE_FORMS-READY_COMPANY-SELECTED', payload: { companiesFormsReady: true}})"
					[ngModelOptions]="{standalone: true}">
				<option *ngFor="let company of cache$.companiesList.items" [ngValue]="company">{{company.name}}</option>
			</select>
			<div *ngIf="!!state$.companiesFormsReady">
				<span class="icon icon-plus"
					  (click)="action.emit({ type: 'SERVICE_COMPANY_CREATE', payload: {}}); action.emit({type: 'SERVICE_COMPANIES_GET', payload: {}})"></span>
				<input-component *ngFor="let question of cache$.companiesList.questions" (action)="action.emit($event)"
								 [model]="([cache$.companiesList.items, selectedCompany.id] | selectByID)[question.key]" [label]="question.label"
								 [control]="companiesForm.controls[question.key]" (onBlur)="onBlur($event, question.key)"></input-component>
				<div *ngIf="!!state$.contactsListReady" class="row">
					<h6>Contacts:</h6>
					<list-component [itemsList]="cache$.contactsList"
									[listItemsReady]="state$.contactsListReady"
									[form]="cache$.contactsList.form" title="Contacts" listContext="contacts"
					></list-component>
				</div>
			</div>
		</div>
	`,
})

export class SideMenuComponent implements OnChanges, OnInit {
	@Input()
	public state$: StateInstance;
	@Input()
	public cache$: any;
	@Input()
	public actionResponse: any;
	@Output()
	public action: EventEmitter<{}> = new EventEmitter<{}>();
	public selectedCompany = <Company>{};

	constructor(private models: ModelService, private ui: UIService) {
	}

	public ngOnInit(): void {
		this.selectedCompany = <Company>this.models.newModel('companies');
	}

	public ngOnChanges(simpleChanges: SimpleChanges): void {
		console.log('SIDEMENU CHANGES', simpleChanges);
		if(simpleChanges['actionResponse']){
			if(this.actionResponse && this.actionResponse.status === 'error') {
				for (let error of this.actionResponse.error) {
					error();
				}
			} else if (this.actionResponse && this.actionResponse.status === 'success') {
				for (let success of this.actionResponse.success) {
					success();
				}
			}
		}
	}

	public newCompany(): void {
		const newModel = this.models.newModel('companies');
		this.action.emit({type: 'CACHE_SELECTED_NEW-COMPANY', payload: {selectedCompany: newModel}});
	}

	public onBlur(event, key): void {
		// this.action.emit({type: 'SET_COMPANIES_REFRESHING', payload: {companiesReady: false}})
		this.action.emit({
			type: 'SERVICE_COMPANY_SET', payload: {
				prop: {[key]: event},
				id: this.selectedCompany.id
			},
			response: {
				response: null,
				status: 'pristine',
				success: [
					()=> {
						this.ui.companiesListUpdate()
					}
				], error: [
					() => {
						this.action.emit({
							type: 'STATE_SERVICE_COMPANY_SET_ERROR',
							payload: {}
						})
					}
				]
			}
		});
		this.action.emit({type: 'CACHE_UPDATED_COMPANY', payload: {companiesList: { items: [this.selectedCompany]}}})
	}
}

export interface InputStore {
	[name: string]: any
}