import {Injectable, OnInit} from '@angular/core';
import {initUser, TWT, User} from './user.model';
import {Observable} from 'rxjs/Observable';
import {SocketService} from '../shared/services/socket.service';
import {FIXTURE_USER_ID} from '../shared/models/FIXTURE_ID';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CRMType} from '../shared/models/crm-models.type';

@Injectable()
export class UsersService implements OnInit {
	private userStatesSource: BehaviorSubject<TWT> = new BehaviorSubject<TWT>(<TWT>{});
	public userState$: Observable<TWT> = this.userStatesSource.asObservable();

	constructor(
				private socketService: SocketService
	) {
	}

	public ngOnInit(): void {
	}

	public getCurrentUserData(credentials?: any): Observable<User> {
		return this.socketService.responseSocket('user.get', {id: credentials})
	}

	public setTWTProp(props: {}): void {
		this.userStatesSource.next(Object.assign(this.userStatesSource, props));
		console.log(this.userStatesSource);
	}

	//todo add credentials auth
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
					resolve(token);
					reject('error with token');
				});
		});
	}
}
