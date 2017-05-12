import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

export const INITIAL_STATE = {
	current: {
	meta: {
		errors: void 0,
		id: new Date().toUTCString()
	},
	logIn: null,
	toggleSideMenu: null,
	toggleBottomMenu: null,
	add: null,
	select :null,
	remove: null,
	edit: null,
	showTemplate: null,
	showAccountSettings: null,
	},
	old: null,
};

	export interface Action {
		type: [],
		payload: any
}

export interface StateSlice {
	actions: Action[];
}

@Injectable()
export class TWSTStore implements OnInit {

	private storeSource: BehaviorSubject<{}> = new BehaviorSubject<{}>({});
	public  twst: Observable<any> = <Observable<{}>> this.storeSource.asObservable();
	constructor(private initialState: {} = INITIAL_STATE, ){
	}

	public ngOnInit(){
		//todo socket userHistory = initialState
		this.initializeState(this.initialState);

	}

	public initializeState(initialState: {}): void {
		this.storeState(initialState);
	}


	public storeState(newState): void {
		this.storeSource.next(Object.assign(this.storeSource, {oldState: this.storeSource, currentState: newState}));
	}

	public sliceState(type, currentState): {type: string, state: } {
		for(let stateType of Object.keys(currentState){
			if(stateType === type) {
				return currentState[stateType];
			}
		}
	}


	public reduceToState(action: {type: string, payload: {method: string, }}, currentState = this.storeSource): any {
		//Takes Action and payload

		//takes current state
		this.storeSource(this.twst.scan(this.sliceState(action.type, currentState) => {

		}))
		//slices current state by type

		//aggregates and increments slice into newSlice

		//aggregates currentState into newState
		return currentState.scan(this.selectStateType(action.type, currentState), action);
	}
}