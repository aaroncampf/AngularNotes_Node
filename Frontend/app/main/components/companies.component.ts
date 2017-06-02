import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Company} from '../models/company.model';
import {Observable} from 'rxjs/Observable';
import {CRMService} from '../services/crm.service';
import * as _ from 'lodash';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Contact} from '../models/contact.model';
import {Quote} from '../models/quote.model';

export interface SelectedCompanyState {
	showDetails: boolean;
	onSelection: boolean;
	companySelected: boolean;
	selectedCompany: {
		index: number;
		company: Company
	}
}

export const INITIAL_COMPANIES_STATE = {
	showDetails: false,
	onSelection: false,
	companySelected: false,
	selectedCompany: {
		index: null,
		company: <Company>{}
	}
};

@Component({
	selector: `companies-component`,
	template: `
		<div class="row">
			<button class="btn btn-block" [routerLink]="['/Add-Company']">Add A Company</button>
		</div>
		<div class="row">
			<div class="col-xs-3 dropdown-toggle" (click)="onSelect({type: 'ON_COMPANY_SELECTION'})"
				 id="companySelectDropDown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
				>Select Company
			</div>
			<div class="col-xs-6" (click)="onSelect({type: 'ON_COMPANY_SELECTION'})">
				<div *ngIf="companiesState.companySelected"
					>{{companiesState.selectedCompany.company.name}}
				</div>
				<div *ngIf="!companiesState.companySelected"
					>Please Select Company
				</div>
			</div>
			<div class="col-xs-3">
				<span class="icon icon-info" (click)="onSelect({type:'TOGGLE_COMPANY_DETAILS'})"></span>
			</div>
			<ul class="dropdown-menu companies-dropdown" aria-labelledby="companySelectDropDown">
				<li *ngFor="let company of (companies$ | async); let i = index"
					(click)="onSelect({type: 'COMPANY_SELECTED', payload: {index: i, company: company}})"
					[class.active]="companiesState.selectedCompany.index === i"
					>{{company.name}}
				</li>
			</ul>
		</div>
		<companies-details *ngIf="companiesState.companySelected && companiesState.showDetails"
						   [formGroup]="companyForm">
			<h1>{{companiesState.selectedCompany.company.name}}'s Details</h1>
			<input-component label="Name"
							 (modelChange)="updateModel({ type:'UPDATE_COMPANY_PROP', payload: { id: companiesState.selectedCompany.company.id, prop: { key: 'name', value: $event}}})"
							 [(model)]="companiesState.selectedCompany.company.name"
							 [control]="nameControl"></input-component>
			<input-component label="Address"
							 (modelChange)="updateModel({type:'UPDATE_COMPANY_PROP', payload: { id: companiesState.selectedCompany.company.id, prop: { key: 'addressOne', value: $event}}})"
							 [(model)]="companiesState.selectedCompany.company.addressOne"
							 [control]="addressOneControl"></input-component>
			<input-component label="City"
							 (modelChange)="updateModel({type:'UPDATE_COMPANY_PROP', payload: { id: companiesState.selectedCompany.company.id, prop: { key: 'city', value: $event}}})"
							 [(model)]="companiesState.selectedCompany.company.city"
							 [control]="cityControl"></input-component>
			<input-component label="Zip"
							 (modelChange)="updateModel({type:'UPDATE_COMPANY_PROP', payload: { id: companiesState.selectedCompany.company.id, prop: { key: 'zip', value: $event}}})"
							 [model]="companiesState.selectedCompany.company.zip"
							 [control]="zipControl"></input-component>
			<input-component label="Phone"
							 (modelChange)="updateModel({type:'UPDATE_COMPANY_PROP', payload: { id: companiesState.selectedCompany.company.id, prop: { key: 'phone', value: $event}}})"
							 [model]="companiesState.selectedCompany.company.phone"
							 [control]="phoneControl"></input-component>
			<input-component label="Fax"
							 (modelChange)="updateModel({type:'UPDATE_COMPANY_PROP', payload: { id: companiesState.selectedCompany.company.id, prop: { key: 'fax', value: $event}}})"
							 [model]="companiesState.selectedCompany.company.fax"
							 [control]="faxControl"></input-component>
			<input-component label="Web Site"
							 (modelChange)="updateModel({type:'UPDATE_COMPANY_PROP', payload: { id: companiesState.selectedCompany.company.id, prop: { key: 'web', value: $event}}})"
							 [model]="companiesState.selectedCompany.company.web"
							 [control]="webControl"></input-component>
		</companies-details>
		<company-contacts *ngIf="companiesState.companySelected">
			<button class="btn btn-block"
			[routerLink]="['/Add-Contact', companiesState.selectedCompany.company.id]">Add Contact
			</button>
			<table>
				<thead>
					<h1>Your Contacts for {{companiesState.selectedCompany.company.name}}</h1>
				</thead>
				<tbody>
					<tr *ngFor="let contact of (contacts$ | async)" (click)="onSelect({type: 'CONTACT_SELECTED', payload: {contact: contact}})">
						<td>{{contact.name}}</td>
					</tr>
				</tbody>
			</table>
			</company-contacts>
		<company-quotes *ngIf="companiesState.companySelected">
			<button class="btn btn-block"
					[routerLink]="['/Add-Quote', companiesState.selectedCompany.company.id]">Add Quote
			</button>
			<table>
				<thead>
				<h1>Your Quotes for {{companiesState.selectedCompany.company.name}}</h1>
				</thead>
				<tbody>
				<tr *ngFor="let quote of (quotes$ | async)" (click)="onSelect({type: 'QUOTE_SELECTED', payload: {quote: quote}})">
					<td>{{quote.name}}</td>
				</tr>
				</tbody>
			</table>
		</company-quotes>
	`
})
export class CompaniesComponent implements OnInit, OnDestroy {
	private companiesSource: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);
	private companiesStateSource: BehaviorSubject<SelectedCompanyState> = new BehaviorSubject<SelectedCompanyState>(INITIAL_COMPANIES_STATE);
	private contactsSource: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);
	public contacts$: Observable<Contact[]> = this.contactsSource.asObservable();
	private quotesSource: BehaviorSubject<Quote[]> = new BehaviorSubject<Quote[]>([]);
	public quotes$: Observable<Quote[]> = this.quotesSource.asObservable();
	public companies$: Observable<Company[]> = this.companiesSource.asObservable();
	public companiesState$: Observable<SelectedCompanyState> = this.companiesStateSource.asObservable();
	public companiesStateSub: Subscription;
	public contactsSub: Subscription;
	public companiesState: SelectedCompanyState;

	public nameControl: FormControl = new FormControl('', []);
	public addressOneControl: FormControl = new FormControl('', []);
	public addressTwoControl: FormControl = new FormControl('', []);
	public cityControl: FormControl = new FormControl('', []);
	public zipControl: FormControl = new FormControl('', []);
	public phoneControl: FormControl = new FormControl('', []);
	public webControl: FormControl = new FormControl('', []);
	public miscControl: FormControl = new FormControl('', []);
	public faxControl: FormControl = new FormControl('', []);
	public companyForm: FormGroup = new FormGroup({
		name: this.nameControl,
		addressOne: this.addressOneControl,
		addressTwo: this.addressTwoControl,
		city: this.cityControl,
		zip: this.zipControl,
		phone: this.phoneControl,
		web: this.webControl,
		misc: this.miscControl,
		fax: this.faxControl,
	});

	constructor(private crmService: CRMService) {
	};

	public ngOnInit(): void {
		this.companiesStateSub = this.companiesState$.subscribe(updatedState => {
			this.companiesState = updatedState;
		});
		this.crmService.getCompanies().then(companies => {
			this.companiesSource.next(companies);
		})
	}

	public ngOnDestroy(): void {
		this.companiesStateSub.unsubscribe();
	}

	public updateModel(action): void {
		this.crmService.setCompany(action.payload).then(() => {
			this.crmService.getCompanies().then(companies => {
				this.companiesSource.next(companies);
			})
		})
	}

	public onSelect(action): void {
		const state = this.companiesStateSource.getValue();
		console.log('old state', state);
		const newState = this.companiesStateReducer(action, state);
		console.log('new state', newState);
		this.companiesStateSource.next(newState);
		this.contactsSource.next(newState.selectedCompany.company.contacts);
		this.quotesSource.next(newState.selectedCompany.company.quotes)
	}


	private companiesStateReducer(action, state): SelectedCompanyState {
		switch (action.type) {
			case'TOGGLE_COMPANY_DETAILS':
				return _.merge(state, {showDetails: !state.showDetails});
			case'ON_COMPANY_SELECTION':
				return _.merge(state, {
					onSelection: !state.onSelection
				});
			case'COMPANY_SELECTED':
				if (state.selectedCompany.index === action.payload.index) {
					return _.merge(state, {
						onSelection: false,
						companySelected: false,
						selectedCompany: {
							index: null,
							company: {
								contacts: [],
								quotes: []
							}
						}
					});
				} else {
					return Object.assign({}, state, {
						onSelection: false,
						companySelected: true,
						selectedCompany: {
							index: action.payload.index,
							company: action.payload.company,
						}
					})
				}
		}
	}
}