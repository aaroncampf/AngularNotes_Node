import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { RDCache} from '../models/typescript-cache.model';
import 'rxjs/add/operator/reduce';
import {newStateAction, StateAction} from '../models/state.model';
import {CRMService} from '../../main/services/crm.service';

export const STATE_INITIAL_STATE = {
	type: 'initial state',
	sideMenuReady: false,
	sideMenu: false
};

@Injectable()
export class StateService {
	private cacheSource: BehaviorSubject<RDCache> = new BehaviorSubject<RDCache>(<RDCache>{
		cacheInitialized: true,

	});
	private stateSource: BehaviorSubject<StateAction[]> = new BehaviorSubject<StateAction[]>(<StateAction[]>[{created_at: Date.now()}]);
	public cache$: Observable<RDCache> = this.cacheSource.asObservable();
	public state$: Observable<any> = this.stateSource.asObservable();

	constructor(private crmService: CRMService) {}

	//todo update for sessions
	public dispatch(type: string, payload: any, sessionToken?: any): Promise<any> {
		return new Promise((resolve) => {
			switch (type.split('_')[0]) {
				case 'SERVICE':
					this.dispatch('STATE_SERVICE_CALLED', {loading: true});
					this.crmService.dispatched(type, payload)
						.subscribe(response => {
							console.log('crmService response', response);
							resolve(response);
						}, err => console.log('State Service CRM Service Dispatch', err));
					break;
				case'CACHE':
					console.log('CACHE', type, payload);
					let response = this.updateCache(newStateAction(type, payload));
					resolve(response);
					break;
				case'STATE':
					response = this.updateState(this.stateSource.getValue(), newStateAction(type, payload, this.currentState(this.stateSource.getValue())));
					resolve(response);
					break;
				case'NAVIGATION':
					//todo BreadCrumbs
					break;
				default:
					console.log('default dispatched with', type, payload);
					break;
			}
		});
	}

	public updateCache(stateAction: StateAction, sessionCredentials?: any): any {
		//todo decrypt
		const newCache = Object.assign({}, this.cacheSource.getValue(), stateAction.payload);

		//todo encrypt
		this.cacheSource.next(newCache);
		console.log('cache', this.cacheSource.getValue() );
		return this.cacheSource.getValue();
	}

	public updateState(states, action: StateAction): any {
			const newState = Object.assign({}, this.currentState(this.stateSource.getValue()),
				{type: action.type}, action.payload);
			const updatedStates = states.concat(newState);
			this.stateSource.next(updatedStates);
			console.log(this.stateSource.getValue());
			return this.stateSource.getValue();
		};

	public currentState(states): {} {
		return states.reduce((acc, cur) => Object.assign(acc, cur), STATE_INITIAL_STATE);
	}
}