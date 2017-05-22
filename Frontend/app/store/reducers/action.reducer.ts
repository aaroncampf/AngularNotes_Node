import {CRMState, STATE_INITIAL_STATE} from '../models/state.model';
import 'rxjs/add/operator/scan'
import {Observable} from 'rxjs/Observable';

function currentState(states) {
	console.log(states);
	Observable.from(states).scan((acc, state) => {
		return Object.assign({}, acc, state);
	}, STATE_INITIAL_STATE).subscribe((response: any) => {
		 return response;
	});
};

export const reducer = (states: CRMState[] = [STATE_INITIAL_STATE], action: any) => {
	let lastIndex = states.length - 1;
	let state =  states[lastIndex];
	switch (action.type) {
		// Options
		case 'OPTIONS_TOGGLE':
			return states.concat(Object.assign(state, {
				optionsMenu: !state.optionsMenu
			}));
		// Menu
		case 'SIDE_MENU_TOGGLE':
			return states.concat(Object.assign(state, {
				sideMenu: !state.sideMenu,
			}));
		case 'OPTIONS_DOWNLOAD':
			return states.concat(Object.assign(state, {
				errorMessage: null
			}));
		case 'OPTIONS_DOWNLOAD_SUCCESS':
			return states.concat(Object.assign(state, {}));
		case 'OPTIONS_DOWNLOAD_ERROR':
			return states.concat(Object.assign(state, {
				errorMessage: 'Could not download ' + state.viewContext
			}));
		case 'SIDE_MENU_INITIALIZE':
			return states.concat(Object.assign(state, {
				sideMenuReady: false,
			}));
		case 'SIDE_MENU_INITIALIZE_SUCCESS':
			return states.concat(Object.assign(state, {
				sideMenuReady: true,
			}));
		case 'SIDE_MENU_INITIALIZE_ERROR':
			return states.concat(Object.assign(state, {
				sideMenuReady: false,
			}));
		//Table Models
		case'COMPANIES_UNSELECTED':
			return states.concat(Object.assign(state, {
				companySelected: false
			}));
		case'COMPANIES_SELECT':
			return states.concat(Object.assign(state, {
				viewContext: 'companies',
				errorMessage: null,
				companySelected: true
			}));
		case'COMPANY_SELECT_ERROR':
			return states.concat(Object.assign(state, {
				errorMessage: 'Could not select Company',
				companySelected: false
			}));
		case'COMPANIES_GET':
			return states.concat(Object.assign(state, {
				loading: true,
				dataReady: false,
				errorMessage: null,
			}));
		case'COMPANIES_GET_SUCCESS':
			return states.concat(Object.assign(state, {
				loading: false,
				dataReady: true,
			}));
		case'COMPANIES_GET_ERROR':
			return states.concat(Object.assign(state, {
				loading: false,
				dataReady: true,
				errorMessage: 'Could not get Companies'
			}));
		case'COMPANIES_CREATE':
			return states.concat(Object.assign(state, {
				loading: true,
				dataReady: false,
				errorMessage: null,
			}));
		case'COMPANY_CREATE_SUCCESS':
			return states.concat(Object.assign(state, {
				loading: false,
				dataReady: true,
			}));
		case'COMPANY_CREATE_ERROR':
			return states.concat(Object.assign(state, {
				loading: false,
				dataReady: true,
				errorMessage: 'Could not get Company'
			}));
		case'COMPANY_REMOVE':
			return states.concat(Object.assign(state, {
				errorMessage: null,
				loading: true
			}));
		case'COMPANY_REMOVE_SUCCESS':
			return states.concat(Object.assign(state, {
				companySelected: false,
				loading: false
			}));
		case'COMPANY_REMOVE_ERROR':
			return states.concat(Object.assign(state, {
				errorMessage: 'Could not remove Company',
				loading: false
			}));
		case'COMPANIES_UPDATE':
			return states.concat(Object.assign(state, {
				loading: true
			}));
		case'COMPANY_UPDATE_SUCCESS':
			return states.concat(Object.assign(state, {
				loading: false
			}));
		case'COMPANY_UPDATE_ERROR':
			return states.concat(Object.assign(state, {
				loading: false,
				errorMessage: 'Could not update Company'
			}));

		case'CONTACTS_UNSELECTED':
			return states.concat(Object.assign(state, {
				companySelected: false
			}));
		case'CONTACTS_SELECT':
			return states.concat(Object.assign(state, {
				viewContext: 'contacts',
				errorMessage: null,
				companySelected: true
			}));
		case'CONTACT_SELECT_ERROR':
			return states.concat(Object.assign(state, {
				errorMessage: 'Could not select Contact',
				contactSelected: false
			}));
		case'CONTACTS_GET':
			return states.concat(Object.assign(state, {
				loading: true,
				dataReady: false,
				errorMessage: null,
			}));
		case'CONTACTS_GET_SUCCESS':
			return states.concat(Object.assign(state, {
				loading: false,
				dataReady: true,
			}));
		case'CONTACTS_GET_ERROR':
			return states.concat(Object.assign(state, {
				loading: false,
				dataReady: true,
				errorMessage: 'Could not get Contacts'
			}));
		case'CONTACTS_CREATE':
			return states.concat(Object.assign(state, {
				loading: true,
				dataReady: false,
				errorMessage: null,
			}));
		case'CONTACT_CREATE_SUCCESS':
			return states.concat(Object.assign(state, {
				loading: false,
				dataReady: true,
			}));
		case'CONTACT_CREATE_ERROR':
			return states.concat(Object.assign(state, {
				loading: false,
				dataReady: true,
				errorMessage: 'Could not get Contact'
			}));
		case'CONTACT_REMOVE':
			return states.concat(Object.assign(state, {
				errorMessage: null,
				loading: true
			}));
		case'CONTACT_REMOVE_SUCCESS':
			return states.concat(Object.assign(state, {
				contactSelected: false,
				loading: false
			}));
		case'CONTACT_REMOVE_ERROR':
			return states.concat(Object.assign(state, {
				errorMessage: 'Could not remove Contact',
				loading: false
			}));
		case'CONTACTS_UPDATE':
			return states.concat(Object.assign(state, {
				loading: true
			}));
		case'CONTACT_UPDATE_SUCCESS':
			return states.concat(Object.assign(state, {
				loading: false
			}));
		case'CONTACT_UPDATE_ERROR':
			return states.concat(Object.assign(state, {
				loading: false,
				errorMessage: 'Could not update Contact'
			}));
		case'QUOTES_UNSELECTED':
			return states.concat(Object.assign(state, {
				quoteSelected: false
			}));
		case'QUOTES_SELECT':
			return states.concat(Object.assign(state, {
				viewContext: 'quotes',
				errorMessage: null,
				quoteSelected: true
			}));
		case'QUOTE_SELECT_ERROR':
			return states.concat(Object.assign(state, {
				errorMessage: 'Could not select Quote',
				quoteSelected: false
			}));
		case'QUOTES_GET':
			return states.concat(Object.assign(state, {
				loading: true,
				dataReady: false,
				errorMessage: null,
			}));
		case'QUOTES_GET_SUCCESS':
			return states.concat(Object.assign(state, {
				loading: false,
				dataReady: true,
			}));
		case'QUOTES_GET_ERROR':
			return states.concat(Object.assign(state, {
				loading: false,
				dataReady: true,
				errorMessage: 'Could not get Quotes'
			}));
		case'QUOTES_CREATE':
			return states.concat(Object.assign(state, {
				loading: true,
				dataReady: false,
				errorMessage: null,
			}));
		case'QUOTE_CREATE_SUCCESS':
			return states.concat(Object.assign(state, {
				loading: false,
				dataReady: true,
			}));
		case'QUOTE_CREATE_ERROR':
			return states.concat(Object.assign(state, {
				loading: false,
				dataReady: true,
				errorMessage: 'Could not get Quote'
			}));
		case'QUOTE_REMOVE':
			return states.concat(Object.assign(state, {
				errorMessage: null,
				loading: true
			}));
		case'QUOTE_REMOVE_SUCCESS':
			return states.concat(Object.assign(state, {
				quoteSelected: false,
				loading: false
			}));
		case'QUOTE_REMOVE_ERROR':
			return states.concat(Object.assign(state, {
				errorMessage: 'Could not remove Quote',
				loading: false
			}));
		case'QUOTES_UPDATE':
			return states.concat(Object.assign(state, {
				loading: true
			}));
		case'QUOTE_UPDATE_SUCCESS':
			return states.concat(Object.assign(state, {
				loading: false
			}));
		case'QUOTE_UPDATE_ERROR':
			return states.concat(Object.assign(state, {
				loading: false,
				errorMessage: 'Could not update Quote'
			}));
		case'NOTES_UNSELECTED':
			return states.concat(Object.assign(state, {
				noteSelected: false
			}));
		case'NOTES_SELECT':
			return states.concat(Object.assign(state, {
				viewContext: 'notes',
				errorMessage: null,
				noteSelected: true
			}));
		case'NOTE_SELECT_ERROR':
			return states.concat(Object.assign(state, {
				errorMessage: 'Could not select Note',
				noteSelected: false
			}));
		case'NOTES_GET':
			return states.concat(Object.assign(state, {
				loading: true,
				dataReady: false,
				errorMessage: null,
			}));
		case'NOTES_GET_SUCCESS':
			return states.concat(Object.assign(state, {
				loading: false,
				dataReady: true,
			}));
		case'NOTES_GET_ERROR':
			return states.concat(Object.assign(state, {
				loading: false,
				dataReady: true,
				errorMessage: 'Could not get Notes'
			}));
		case'NOTES_CREATE':
			return states.concat(Object.assign(state, {
				loading: true,
				dataReady: false,
				errorMessage: null,
			}));
		case'NOTE_CREATE_SUCCESS':
			return states.concat(Object.assign(state, {
				loading: false,
				dataReady: true,
			}));
		case'NOTE_CREATE_ERROR':
			return states.concat(Object.assign(state, {
				loading: false,
				dataReady: true,
				errorMessage: 'Could not get Note'
			}));
		case'NOTE_REMOVE':
			return states.concat(Object.assign(state, {
				errorMessage: null,
				loading: true
			}));
		case'NOTE_REMOVE_SUCCESS':
			return states.concat(Object.assign(state, {
				noteSelected: false,
				loading: false
			}));
		case'NOTE_REMOVE_ERROR':
			return states.concat(Object.assign(state, {
				errorMessage: 'Could not remove Note',
				loading: false
			}));
		case'NOTES_UPDATE':
			return states.concat(Object.assign(state, {
				loading: true
			}));
		case'NOTE_UPDATE_SUCCESS':
			return states.concat(Object.assign(state, {
				loading: false
			}));
		case'NOTE_UPDATE_ERROR':
			return states.concat(Object.assign(state, {
				loading: false,
				errorMessage: 'Could not update Note'
			}));
		case'USER_LOG_IN':
			return states.concat(Object.assign(state, {
				loading: true,
				loggedIn: false,
				errorMessage: null
			}));
		case'USER_LOG_IN_SUCCESS':
			return states.concat(Object.assign(state, {
				loading: false,
				loggedIn: true
			}));
		case'USER_LOG_IN_ERROR':
			return states.concat(Object.assign(state, {
				loading: false,
				loggedIn: false,
				errorMessage: 'Could not log in'
			}));

		default:
			return states.concat();
	}
};
