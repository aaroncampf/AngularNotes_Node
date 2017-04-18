import {Injectable, Input} from '@angular/core';
import {SocketService} from './socket.service';
import {User} from '../models/user.model';
import {SERVER_MAP} from '../models/servers.map';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {

	constructor(private socketService: SocketService, ){}

	//todo: Return Token
	public logIn(credentials: {}, user:User): any  {
		this.socketService.responseSocket('auth.logIn', {credentials: credentials, user: user},'localhost:3591')
			.subscribe(response => response);
	}

	public logOut(user:User): void {
		this.socketService.responseSocket('auth.logOut', {user: user}, 'localhosr:3591')
			.subscribe(response => response);
	}

	public isLoggedIn(user: User): any {
		console.log('server map', SERVER_MAP);
		this.socketService.responseSocket('auth.isLoggedIn', user, 'localhost:3591')
			.subscribe((res: boolean)=> {
			return res;
		});
	}

}