import {Injectable} from '@angular/core';

export interface Session {
	focused: {};
	formContext: string;
	viewContext: string;
	myAccount: {
		toggles: number;
	}
	sideMenu: {
		toggles: number;
		toggled: boolean;
	};
	bottomMenu: {
		toggles: number;
		toggled: boolean;
	};
}

export const INITIAL_STATE = {
	myAccount: {
		toggles: 0
	},
	focused: null,
	viewContext: 'entry',
	formContext: 'companies',
	sideMenu: {
		toggles: 0,
		toggled: false,
	},
	bottomMenu: {
		toggles: 0,
		toggled: false,
	},
};

@Injectable()
export class SessionReducer {

public sessionReducer = (state: Session[] = [INITIAL_STATE], action) => {
	let SessionState = (currentState: Session = state[state.length - 1]) => {
		return {
			focused: currentState.focused,
			formContext: currentState.formContext,
			myAccount: {
				toggles: currentState.myAccount,
			},
			sideMenu: {
				toggles: currentState.sideMenu.toggles,
				toggled: currentState.sideMenu.toggled
			},
			bottomMenu: {
				toggles: currentState.bottomMenu.toggles,
				toggled: currentState.bottomMenu.toggled
			}
		};
	};
	switch(action.type){
		case('SIDE_MENU_TOGGLE'):
			const CURRENT_STATE = SessionState(state[state.length - 1]);
			return [
				...state,
				Object.assign({}, CURRENT_STATE, {
					sideMenu: {
						toggles: CURRENT_STATE.sideMenu.toggles + 1,
					}
				})
			];
		case('My_ACCOUNT_TOGGLE'):
			return [
				...state,
				Object.assign({}, CURRENT_STATE, {
					sideMenu: {
						toggles: +CURRENT_STATE.myAccount.toggles + 1,
					}
				})
			];
		case('BOTTOM_MENU_TOGGLE'):
			return [
				...state,
				Object.assign({}, CURRENT_STATE, {
					sideMenu: {
						toggles: CURRENT_STATE.sideMenu.toggles + 1,
					}
				})
			];
		case('CREATE_CONTEXT'):
			return [
				...state,
				Object.assign({}, CURRENT_STATE, {formContext:action.payload.formContext})
			];
			case('SELECT_DETAILS'):
				console.log('details!', action);
			return [
				...state,
				Object.assign({}, CURRENT_STATE, { details: action.payload.selected})
			];
		case('BUILD_FORM_LIST'):
			return [
				...state,
				Object.assign({}, CURRENT_STATE, {listItems: action.payload.listItems})
			];
		default:
			return state;
		}
	}
}



