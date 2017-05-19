import {CRMType} from '../../main/models/crm-models.type';

export const STATE_INITIAL_STATE = {
	viewContext: 'companies',
	viewMode: null,
	focused: false,
	details: false,
	sideMenu: false,
	sideMenuBottomMenu: false,
	bottomMenu: false,
	optionsMenu: false,
	settingsMenu: false,
	userLoggedIn: false,
	loading: false,
	loggedIn: false,
	errorMessage: null,
	dataReady: false,
	formReady: false,
	companiesReady: false,
	companySelected: false,
	contactSelected: false,
	quoteSelected: false,
};

export interface CRMState  {
	viewContext: string;
	viewMode: string;
	focused: boolean;
	details: boolean;
	sideMenu: boolean;
	sideMenuBottomMenu: boolean,
	bottomMenu: boolean;
	optionsMenu: boolean;
	settingsMenu: boolean;
	userLoggedIn: boolean;
	loading: boolean;
	loggedIn: boolean;
	errorMessage: string;
	dataReady: boolean,
	formReady: boolean,
	companiesReady: boolean,

}