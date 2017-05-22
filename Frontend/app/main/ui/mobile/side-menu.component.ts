import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {List} from '../../../forms/services/forms.service';
import {Company} from '../../models/company.model';

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
			<i class="glyphicon glyphicon-plus-sign" (click)="newCompany()"></i>
			<input-component *ngFor="let question of companiesList.questions" (action)="action.emit($event)"
							 [store]="question.store" [model]="selectedCompany[question.key]" [label]="question.label"
							 [control]="companiesList.controls[question.key]"
							 (onBlur)="action.emit({type: 'SERVICE_COMPANY_SET', payload: {value: $event, id: selectedCompany.id, key: question.key}})"></input-component>
			<div class="row">
				<notes-label class="col-xs-4"><strong>Misc.</strong></notes-label>
				<notes-view class="col-xs-8">
					<text-area class="form-control" [(ngModel)]="selectedCompany[misc]" [formControl]="miscFormControl"
							   placeholder="Notes Here . ."></text-area>
				</notes-view>
			</div>
			<div class="row">
				<h6>Contacts:</h6>
				<list-component *ngIf="contactsReady" [listItems]="contactsList.items" [detailsForm]="contactsForm"
								createContext="contacts"></list-component>
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
	public companiesList: List = <List>{};
	@Input()
	public contactsList: List = <List>{};
	@Input()
	public companiesReady: boolean = false;
	@Input()
	public contactsReady: boolean = false;
	public miscFormControl: FormControl = new FormControl('', []);
	public selectedCompany: Company = <Company>{};

	public ngOnInit(): void {

	}

	public ngOnChanges(simpleChanges: SimpleChanges): void {
		console.log('ONCHANGES sidemenu', simpleChanges);
		this.companiesForm.addControl('miscControl', this.miscFormControl);
	}

	public newCompany(): void {
	}
}

export interface InputStore {
	[name: string]: any
}