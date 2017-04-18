import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Settings} from '../common/models/setting.model';
import * as io from 'socket.io-client';
import {User} from '../common/models/user.model';

export const MOCK_USER :User = {
	id: '1',
	email: 'test@tester.com',
	firstName: 'Foo',
	lastName: 'Bar',
	password: 'password'

};

@Injectable()
export class UserService{
	private socket = io.connect('localhost:1729', {
		reconnection: true
	});
	private _authenticated: boolean = false;
	constructor() {
	}

	public getSettings(id: number): Observable<Settings> {
		this.socket.connect('localhost:1729');
		this.socket.emit('get.user', id);
		return Observable.of(this.socket.on('get.user', (response:Settings) =><Settings>response,
			error => console.log('getSettings error', error)));
	}

	//todo put in backend auth server
	public authenticate(email: string, password: string): Observable<User> {
		if (email === MOCK_USER.email && password === MOCK_USER.password) {
			this._authenticated = true;
			return Observable.of(MOCK_USER);
		}
		return Observable.throw(new Error('Invalid email or password'));
	}

	public authenticated(): Observable<boolean> {
		return Observable.of(this._authenticated);
	}

	public authenticatedUser(): Observable<User> {
		return Observable.of(MOCK_USER);
	}

	public create(user: User): Observable<User> {
		//todo Backend call
		this._authenticated = true;
		return Observable.of(user);
	}

	public signout(): Observable<boolean> {
		//todo Backend call
		this._authenticated = false;
		return Observable.of(true);
	}

}