import {Injectable, OnInit} from '@angular/core';
import {User} from './user.model';
import {Observable} from 'rxjs/Observable';
import {SocketService} from '../shared/services/socket.service';

@Injectable()
export class UsersService implements OnInit {
	constructor(private socketService: SocketService
	) {}

	public ngOnInit(): void {
	}

	public getCurrentUserData(credentials?: any): Observable<User> {
		return this.socketService.responseSocket('user.get', {id: credentials})
	}

}
