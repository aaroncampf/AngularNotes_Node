import {Injectable} from '@angular/core';
import {Company} from '../models/company.model';
import {Contact} from '../models/contact.model';
import {Quote} from '../models/quote.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';
import * as _ from 'lodash';

export interface CRMUserStore {
	currentUser: User
}

export interface CRMStore {
	selectedCompany: Company;
	selectedContact: Contact;
	selectedQuote: Quote;
	companySelected: boolean;
	contactSelected: boolean;
	quoteSelected: boolean;
	activeRoute: string;
}

export const INITIAL_STATE_USER_STORE = {
	currentUser: <User>{}
};

export const INITIAL_STATE_CRM_STORE = {
	selectedCompany: <Company>{},
	selectedContact: <Contact>{},
	selectedQuote: <Quote>{},
	companySelected: false,
	contactSelected: false,
	quoteSelected: false,
	activeRoute: 'MAIN'
};

@Injectable()
export class CRMStoreService {
	private crmStoreSource: BehaviorSubject<CRMStore> = new BehaviorSubject<CRMStore>(INITIAL_STATE_CRM_STORE);
	public crmStore$: Observable<CRMStore> = this.crmStoreSource.asObservable();
	private crmUserSource: BehaviorSubject<CRMUserStore> = new BehaviorSubject<CRMUserStore>(INITIAL_STATE_USER_STORE);
	public crmUser$: Observable<CRMUserStore> = this.crmUserSource.asObservable();

	constructor(
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
		const {selectedCompany, selectedContact, selectedQuote, companySelected, contactSelected, quoteSelected} = state;
		switch (action.type){
			case'ROUTE_NAVIGATED':
				return _.merge(state, {
					activeRoute: action.payload.route
				});
			case'COMPANY_SELECTED':
				const newCompany = action.payload.company;
				if(action.payload.company.id){
					return _.merge(state,{
						selectedCompany: newCompany,
						selectedContact: <Contact>{},
						contactSelected: false,
						companySelected: true

					});
				} else {
					return  {
						selectedCompany: <Company>{},
						selectedContact: <Contact>{},
						selectedQuote: <Quote>{},
						companySelected: false,
						contactSelected: false,
						quoteSelected: false,
						activeRoute: state.activeRoute
					}
				}
			case'CONTACT_SELECTED':
				const newContact = action.payload.contact;
				const contactCompany = action.payload.company;
				return _.merge(state, {
					selectedCompany: contactCompany,
					selectedContact: newContact,
					contactSelected: true
				});
			case'QUOTE_SELECTED':
				const newQuote = action.payload.quote;
				return _.merge(state, {
					selectedQuote: newQuote,
					quoteSelected: true,
				});
			default:
				return state;
		}
	}
}