import {Inject, Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {RD_CACHE_INITIAL_STATE, RDCache} from '../models/typescript-cache.model';
import {CRMState, STATE_INITIAL_STATE} from '../models/state.model';
import {Store} from '@ngrx/store';

@Injectable()
export class StateService implements OnInit {
	public tcSource: BehaviorSubject<RDCache> = new BehaviorSubject<RDCache>(<RDCache>{});
	public stateSource: BehaviorSubject<CRMState> = new BehaviorSubject<CRMState>(<CRMState>{});
	public tc$: Observable<RDCache> = this.tcSource.asObservable();
	public state$: Observable<CRMState> = this.stateSource.asObservable();

	constructor(private _store: Store<any>){
	};

	public ngOnInit(): void {
	}

	public dispatch(type, payload): void {
		this.setTCProp(payload);
		this._store.dispatch({type: type, payload: payload});

	}

	public setTCProp(props: {}): void {
		let updatedCache: RDCache = <RDCache>{};
		for (let key of Object.keys(props)) {
			Object.assign(updatedCache, {[key]: props[key]});
		}
		console.log('updated cache', updatedCache);
		this.tcSource.next(updatedCache);
	}

	public initTC(initialState?): Promise<RDCache> {
		return new Promise((resolve) => {
			const tc: RDCache = this.tcFactory(initialState);
			resolve(tc);
		})
	};

	private tcFactory(tc: RDCache = RD_CACHE_INITIAL_STATE): RDCache {
		//todo verify user is logged in

		//todo assign user data

		//todo assign models

		//todo assign form and list data
		return tc;
	}

}