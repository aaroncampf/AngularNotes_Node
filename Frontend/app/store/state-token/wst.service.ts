import {Injectable} from '@angular/core';
import {initUser} from '../../users/user.model';
import {FIXTURE_USER_ID} from '../../main/models/FIXTURE_ID';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {WST} from './wst.model';
import {SocketService} from '../../shared/services/socket.service';

@Injectable()
export class WritableStateTokenService{
	private userStatesSource: BehaviorSubject<WST> = new BehaviorSubject<WST>(<WST>{});
	public userState$: Observable<WST> = this.userStatesSource.asObservable();
	constructor(private sockets: SocketService){}

	public setTWTProp(props: {}): void {
		this.userStatesSource.next(Object.assign(this.userStatesSource, props));
		console.log(this.userStatesSource);
	}

	//todo add credentials auth
	public WSTFactory(initialState): Promise<WST> {
		return new Promise((resolve, reject) => {
			//todo if id else demoId
			this.sockets
				.responseSocket('user.get', {id: FIXTURE_USER_ID})
				.subscribe(user => {
					let token: WST = <WST>{};
					Object.assign(token, initUser(user));
					// for (let prop of Object.keys(user)) {
					// 	token[prop] = user[prop];
					// }
					resolve(token);
					reject('error with token');
				});
		});
	}
}