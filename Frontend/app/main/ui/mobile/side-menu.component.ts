import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Company} from '../../models/company.model';
import {ModelService} from '../../../shared/services/model.service';
import {StateInstance} from '../../../store/models/state.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CRMService} from '../../services/crm.service';
import * as _ from 'lodash';
import {Contact} from '../../models/contact.model';
import {CRMType} from '../../models/crm-models.type';

export const SIDE_MENU_INITIAL_STATE = {
	selected: {},
	lastSelected: null
};

export interface ContactsState {
	[ownerID: string]: Contact[];
}

export interface SideMenuState {
	lastSelected: CRMType;
	selected: {
		[id: string]: boolean;
	};
}

@Component({
	selector: 'side-menu',
	template: `
		<table class="table table-bordered table-responsive table-hover">
			<thead>
				<strong>Company Select</strong>
			</thead>
			<tbody>
				<tr *ngFor="let company of (companies$ | async)"
					(click)="onSelect({type: 'COMPANY_SELECTED', payload: {company: company}})">
					<td [class.active]="(sideMenuState | async).selected[company.id]">{{company.name || 'no name'}}</td>
				</tr>
			</tbody>
		</table>
		<table class="table table-bordered table-responsive table-hover">
			<thead>
				<strong>Contact Select</strong>
			</thead>
			<tbody>
				<tr *ngFor="let contact of (contacts$ | async)"
					(click)="onSelect({type: 'CONTACT_SELECT', payload: {company: company}})">
					<td>{{contact.name}}</td>
				</tr>
			</tbody>
		</table>
	`,
})

export class SideMenuComponent implements OnChanges, OnInit {
	@Input()
	public state$: StateInstance;
	@Input()
	public cache$: any;
	@Output()
	public action: EventEmitter<{}> = new EventEmitter<{}>();
	public selectedCompany = <Company>{};
	private companiesSource: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);
	private contactsSource: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);
	public companies$ = this.companiesSource.asObservable();
	public contacts$ = this.contactsSource.asObservable();
	public sideMenuState: BehaviorSubject<SideMenuState> = new BehaviorSubject<SideMenuState>(SIDE_MENU_INITIAL_STATE);

	constructor(private models: ModelService, private crmService: CRMService) {
	}

	public ngOnInit(): void {
		this.selectedCompany = <Company>this.models.newModel('companies');
		this.crmService.getCompanies().then(companies => {
			this.companiesSource.next(companies);
		});
		this.sideMenuState.subscribe(state => {
			let contactsArray = [];
			const companies = this.companiesSource.getValue();
			for (let id of Object.keys(state.selected)){
				for (let company of companies){
					if (company.id === id){
						contactsArray.concat(company.contacts);
					}
				}
			}
			this.contactsSource.next(contactsArray);
			console.log('contacts', this.contactsSource.getValue());
		})
	}

	public ngOnChanges(simpleChanges: SimpleChanges): void {
	}

	public onSelect(action): void {
		const currentState = this.sideMenuState.getValue();
		const updatedState = this.sideMenuReducer(action, currentState);
		this.action.emit({type: 'STATE_SELECTED_CRM_TYPE', payload: {selected: updatedState.lastSelected}})
		this.sideMenuState.next(updatedState);
	}

	public sideMenuReducer(action, state) {
		console.log('company selected', action.payload.company);
		switch (action.type){
			case'COMPANY_SELECTED':
				if (state.selected[action.payload.company.id]) {
					return _.merge(state, {
						lastSelected: action.payload.company,
						selected: {
							[action.payload.company.id]: !state.selected[action.payload.company.id]
						}
					});
				} else {
					return _.merge(state, {
						lastSelected: action.payload.company,
						selected: {
							[action.payload.company.id]: true
						}
					});
				}
		case'CONTACT_SELECTED':
				if (state.selected[action.payload.contact.id]) {
					return _.merge(state, {
						lastSelected: action.payload.contact,
						selected: {
							[action.payload.contact.id]: !state.selected[action.payload.contact.id]
						}
					});
				} else {
					return _.merge(state, {
						lastSelected: action.payload.contact,
						selected: {
							[action.payload.contact.id]: true
						}
					});
				}
		}
	}

	public newCompany(): void {
	}
}

export interface InputStore {
	[name: string]: any
}