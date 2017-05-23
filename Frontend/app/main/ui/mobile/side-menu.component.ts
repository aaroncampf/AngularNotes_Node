import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {List, ListControls} from '../../../forms/services/forms.service';
import {Company} from '../../models/company.model';
import {ModelService} from '../../../shared/services/model.service';
import {Observable} from 'rxjs/Observable';

@Component({
	selector: 'side-menu',
	template: `
		<div class="row">
			<strong>Company Select</strong>
		</div>
		<div class="row" *ngIf="companiesReady" [formGroup]="companiesForm">
			<select class="form-control" [(ngModel)]="selectedCompany" [ngModelOptions]="{standalone: true}">
				<option *ngFor="let company of companiesList.items" [ngValue]="company">{{company?.name}}</option>
			</select>
			<span class="icon icon-plus" (click)="action.emit({ type: 'SERVICE_COMPANY_CREATE', payload: {}}); action.emit({type: 'SERVICE_COMPANIES_GET', payload: {}})"></span>
			<input-component *ngFor="let question of companiesList.questions" (action)="action.emit($event)"
							 [store]="question.store" [model]="selectedCompany[question.key]" [label]="question.label"
							 [control]="companiesList.controls[question.key]"
							 (onBlur)="action.emit({type: 'SERVICE_COMPANY_SET', payload: {value: $event, id: selectedCompany.id, key: question.key}})"></input-component>
			<div class="row">
				<h6>Contacts:</h6>
				<!--<list-component *ngIf="contactsReady" [listItems]="contactsList?.items" [detailsForm]="contactsForm"-->
								<!--createContext="contacts"></list-component>-->
			</div>
		</div>
	`,
})

export class SideMenuComponent implements OnChanges, OnInit {
	@Output()
	public action: EventEmitter<{}> = new EventEmitter<{}>();
	@Input()
	public companiesForm: FormGroup;
	@Input()
	public contactsForm: FormGroup;
	@Input()
	public companiesList: List = {
		controls: <ListControls>{},
		items: [],
		questions: [],
		subLists: []
	};
	public contactsList: List = <List>{};
	@Input()
	public companiesReady: boolean = false;
	@Input()
	public contactsReady: boolean = false;
	@Input()
	public selectedCompany: Company = <Company>{};
	@Output()
	public selectedCompanyChange: EventEmitter<Company> = new EventEmitter<Company>();

	constructor(private models: ModelService) {}
	public ngOnInit(): void {
		this.selectedCompany = this.companiesList.items[0];
	}

	public ngOnChanges(simpleChanges: SimpleChanges): void {

		if(simpleChanges['companiesList']){
			console.log('reforming side menu');
			this.companiesReady = false;
			const controls = simpleChanges['companiesList'].currentValue.controls;
			this.companiesForm = new FormGroup(controls);
			this.companiesReady = true;
		}
		console.log('ONCHANGES sidemenu', simpleChanges);
	}

	public newCompany(): void {
		this.selectedCompany = <Company>this.models.newModel('companies');
	}
}

export interface InputStore {
	[name: string]: any
}