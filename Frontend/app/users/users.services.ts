import {Injectable} from '@angular/core';
import {initUser, TWT} from './user.model';
import {Observable} from 'rxjs/Observable';
import {SocketService} from '../global/services/socket.service';
import {FIXTURE_USER_ID} from '../global/models/FIXTURE_ID';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class UsersServices {
	private userStatesSource: Subject<TWT> = new Subject();
	public userState$: Observable<TWT> = this.userStatesSource.asObservable();
	public setTWTProp(prop:{} | string): void {
		this.userStatesSource.next(this.userStatesSource = Object.assign(this.userStatesSource, this.userStatesSource[Object.keys(prop)[0]], prop));
	}
}

@Injectable()
export class TokenService {
	constructor(private socketService: SocketService) {
	};

	//todo add credentials
	public tokenFactory(): Promise<TWT> {
		return new Promise((resolve, reject) => {
			//todo if id else demoId
			this.socketService
				.responseSocket('user.get', {id: FIXTURE_USER_ID})
				.subscribe(user => {
					let token: TWT = <TWT>{};
					Object.assign(token, initUser(user));
					// for (let prop of Object.keys(user)) {
					// 	token[prop] = user[prop];
					// }
					console.log('token', token);
					console.log('user', user);
					resolve(token);
					reject('error with token');
				});
		})
	};
}