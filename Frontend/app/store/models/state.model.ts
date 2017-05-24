export const STATE_INITIAL_STATE = {
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

export interface StateInstance {
	[name: string]: any;
}

export function newStateAction(type, payload, currentState?) {
	const newStateAction =  <StateInstance>{
		//todo make serializable UUID
		// id: currentState[currentState.length - 1].id  ?  currentState[currentState.length - 1].id + 1 : 0,
		timeStamp: Date.now(),
		type: type,
		payload: payload
	};
	return newStateAction;
}
