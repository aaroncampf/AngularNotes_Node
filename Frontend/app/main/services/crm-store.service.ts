import {Injectable} from '@angular/core';
import {Company} from '../models/company.model';
import {Contact} from '../models/contact.model';
import {Quote} from '../models/quote.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {CRMDataService} from './crm-data.service';
import {User} from '../models/user.model';

export interface CRMUserStore {
	currentUser: User
}

export interface CRMStore {
	selectedCompany: Company;
	selectedContact: Contact;
	selectedQuote: Quote;
}

export const INITIAL_STATE_USER_STORE = {
	currentUser: <User>{}
};

export const INITIAL_STATE_CRM_STORE = {
	selectedCompany: <Company>{},
	selectedContact: <Contact>{},
	selectedQuote: <Quote>{}
};

@Injectable()
export class CRMStoreService {
	private crmStoreSource: BehaviorSubject<CRMStore> = new BehaviorSubject<CRMStore>(INITIAL_STATE_CRM_STORE);
	public crmStore$: Observable<CRMStore> = this.crmStoreSource.asObservable();
	private crmUserSource: BehaviorSubject<CRMUserStore> = new BehaviorSubject<CRMUserStore>(INITIAL_STATE_USER_STORE);
	public crmUser$: Observable<CRMUserStore> = this.crmUserSource.asObservable();

	constructor(
		private crmData: CRMDataService
	){}

	public crmStoreDispatcher(action): void {
		const currentState = this.crmStoreSource.value;
		const newState = this.crmStoreReducer(action, currentState);
		this.crmStoreSource.next(newState);
	}
	
	public crmUserDispatcher(action): void {
		const currentUserState = this.crmUserSource.value;
		const newState = this.crmUserReducer(action, currentUserState);
		this.crmUserSource.next(newState);
	}

	private crmUserReducer(action, state): CRMUserStore {
		switch (action.type){
			case'USER_UPDATED':
				return {
					currentUser: action.payload.user
				};
			default:
				return state;
		}
	}

	private crmStoreReducer(action, state): CRMStore {
		const {selectedCompany, selectedContact, selectedQuote} = state;
		switch (action.type){
			case'COMPANY_SELECTED':
				const newCompany = action.payload.company;
				return {
					selectedCompany: newCompany,
					selectedContact: selectedContact,
					selectedQuote: selectedQuote
				};
			case'CONTACT_SELECTED':
				const newContact = action.payload.contact;
				const contactCompany = action.payload.company;
				console.log(contactCompany);
				return {
					selectedCompany: contactCompany,
					selectedContact: newContact,
					selectedQuote: selectedQuote
				};
			case'QUOTE_SELECTED':
				const newQuote = action.payload.quote;
				return {
					selectedCompany: selectedCompany,
					selectedContact: selectedContact,
					selectedQuote: newQuote
				};
			default:
				return state;
		}
	}
}