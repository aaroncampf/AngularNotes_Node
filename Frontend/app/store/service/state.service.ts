import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { RDCache} from '../models/typescript-cache.model';
import 'rxjs/add/operator/reduce';
import {newStateAction, StateInstance} from '../models/state.model';
import {CRMService} from '../../main/services/crm.service';
import * as _ from 'lodash'

export const STATE_INITIAL_STATE = {
	type: 'initial state',
	sideMenuReady: false,
	sideMenu: false
};

export interface ActionResponse {
	success: any[];
	error: any[];
	response: any;
	status: string;
}

@Injectable()
export class StateService {
	private cacheSource: BehaviorSubject<RDCache> = new BehaviorSubject<RDCache>(<RDCache>{
		cacheInitialized: true,
	});
	private stateSource: BehaviorSubject<StateInstance[]> = new BehaviorSubject<StateInstance[]>(<StateInstance[]>[{created_at: Date.now()}]);
	public cache$: Observable<RDCache> = this.cacheSource.asObservable();
	public state$: Observable<any> = this.stateSource.asObservable();

	constructor(private crmService: CRMService) {}

	//todo update for sessions

	public dispatch(type: string, payload: any, actionResponse?: ActionResponse, sessionToken?: any): Promise<any> {
		return new Promise((resolve, reject) => {
			switch (type.split('_')[0]) {
				case 'SERVICE':
					this.dispatch('STATE_SERVICE_CALLED', {loading: true});
					this.crmService.dispatched(type, payload).subscribe(response => {
							if (actionResponse){
								actionResponse.response = response;
								actionResponse.status = 'success';
								resolve(actionResponse);
							}
							resolve(response);
						}, err => {
							if (actionResponse){
								actionResponse.error.concat(console.log('State Service CRM Service Dispatch'));
								actionResponse.response = err;
								actionResponse.status = 'error';
								reject(actionResponse)
							}
						reject(err);
					});
					break;
				case'CACHE':
					let response = this.updateCache(newStateAction(type, payload));
					resolve(response);
					break;
				case'STATE':
					response = this.updateState(this.stateSource.getValue(), newStateAction(type, payload, this.currentState(this.stateSource.getValue())));
					resolve(response);
					break;
				case'NAVIGATION':
					response = this.updateState(this.stateSource.getValue(), newStateAction(type, payload, this.currentState(this.stateSource.getValue())));
					resolve(response);
					break;
				default:
					console.log('default dispatched with', type, payload);
					break;
			}
		});
	}

	public updateCache(stateAction: StateInstance, sessionCredentials?: any): any {
		//todo decrypt
		const currentCache = this.cacheSource.getValue();
		let newCache = _.merge(currentCache, stateAction.payload);
		// const newCache = Object.assign({}, this.cacheSource.getValue(), stateAction.payload);

		//todo encrypt
		this.cacheSource.next(newCache);
		// console.log('UPDATED CACHE : ', this.cacheSource.getValue() );
		return this.cacheSource.getValue();
	}

	public updateState(states, action: StateInstance): any {
			const newState = Object.assign(
				{},
				this.currentState(this.stateSource.getValue()),
				{id: Date.now()},
				{type: action.type},
				action.payload);
			const updatedStates = states.concat(newState);
			this.stateSource.next(updatedStates);
			// console.log('UPDATED STATES : ', this.stateSource.getValue());
			return this.stateSource.getValue();
		};

	public currentState(states): {} {
		return states.reduce((acc, cur) => Object.assign(acc, cur), STATE_INITIAL_STATE);
	}

	public nextState(states: StateInstance[], currentState: StateInstance): StateInstance {
		let i = 0;
		return Observable.from(states).map(val => {
			if(val.id === currentState.id) {
				if(i < states.length){
					return states[i + 1];
				}
			}
			i++;
		}).subscribe(state => {
			return state;
		});
	}

	public previousState(states: StateInstance[], currentState: StateInstance): StateInstance {
		let i = 0;
		return Observable.from(states).map(val => {
			if(val.id === currentState.id) {
				if(i > 0){
					return states[i - 1];
				}
			}
			i++;
		}).subscribe(state => {
			return state;
		});
	}
}