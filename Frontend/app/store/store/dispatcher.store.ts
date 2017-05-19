import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Injectable} from '@angular/core';
import {CRMState} from '../models/state.model';

@Injectable()
export class StateCacheDispatcher extends Subject<any>{
	public dispatch(value: any) : void {
		this.next(value);
	}
}

@Injectable()
export class CRMStateStore extends BehaviorSubject<CRMState> {
	constructor(
		private dispatcher,
		initialState
	){
		super(initialState);
		this.dispatcher.subscribe(state => super.next(state))
	}
	public dispatch(value){
		this.dispatcher.dispatch(value);
	}

	public next(value){
		this.dispatcher.dispatch(value);
	}
}

//Todo Caching Dispatch Service
// @Injectable()
// export class CRMCache extends BehaviorSubject<RDCache> {
// 	constructor(
// 		private dispatcher,
// 		initialState = RD_CACHE_INITIAL_STATE,
// 		actions
// 	){
// 		super(initialState);
// 		this.dispatcher.let(payload).scan.subscribe(cache => {
// 			cache.
// 			super.next(cache)
// 		})
// 	}
// 	public dispatch(value){
// 		this.dispatcher.dispatch(value);
// 	}
//
// 	public next(value){
// 		this.dispatcher.dispatch(value);
// 	}
// }
//
// const dispatcher = new StateCacheDispatcher();
// const store = new CRMStore(dispatcher, 'INITIAL STATE');
// const subscriber = store.subscribe(val => console.log(`VALUE FROM STORE: ${val}`));
//
// dispatcher.dispatch('DISPATCHED VALUE!');
// store.dispatch('ANOTHER ONE');
//
// const  actionStream$  = new Subject();
//
