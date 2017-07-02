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
		console.log(newState);
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
				const newCompany = action.payload;
					return _.merge(state,{
						selectedCompany: newCompany,
						selectedContact: <Contact>{},
						contactSelected: false,
						companySelected: true

					});
			case'COMPANY_UN_SELECTED':{
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
				const newContact = action.payload;
				return _.merge({}, state, {
					selectedContact: newContact,
					contactSelected: true
				});
			case'CONTACT_UN_SELECTED':
				return _.merge({}, state, {
					selectedContact: <Contact>{},
					contactSelected: false
				});
			case'QUOTE_SELECTED':
				const newQuote = action.payload;
				return _.merge({}, state, {
					selectedQuote: newQuote,
					quoteSelected: true,
				});
			case'QUOTE_UN_SELECTED':
				return _.merge({}, state, {
					selectedQuote: <Quote>{},
					quoteSelected: false,
				});
			default:
				return state;
		}
	}
}