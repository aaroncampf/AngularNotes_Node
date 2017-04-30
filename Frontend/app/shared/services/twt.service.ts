import {initUser, TWT} from '../../users/user.model';
import {FIXTURE_USER_ID} from '../models/FIXTURE_ID';
import {SocketService} from './socket.service';
import {Injectable} from '@angular/core';
import {CRMType} from '../models/CRMTypes.type';

@Injectable()
export class TokenService {
	constructor(private socketService: SocketService) {
	};

	//todo add credential authentication
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