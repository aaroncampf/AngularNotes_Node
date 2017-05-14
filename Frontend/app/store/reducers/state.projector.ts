import {Injectable} from '@angular/core';
import {State, Store} from '@ngrx/store';
import {WritableStateTokenService} from '../state-token/wst.service';

@Injectable()
export class StateProjections {
	constructor(private wstService:WritableStateTokenService, private _store: Store<any>) {};

	public updateWST(key: string): void {
		const STATE = this.setState(key);
		this.wstService.setTWTProp(STATE);
	}

	public setState(key: string, direction?, steps?, position?): State<any> {
		this._store.select(key).subscribe((res: {}[]) => {
			switch (direction) {
				case'forward':
					if ((position + steps) > (res.length - Math.abs(position))) {
						return res[position + steps];
					}
					break;
				case'backward':
					if ((position - steps) > 0) {
						return res[position - steps];
					}
					break;
				default:
					return ({[key]: res[res.length - 1]});
			}
		});
		return void 0;
	}
}