import {Injectable, OnInit} from '@angular/core';
import {User} from './user.model';
import {Observable} from 'rxjs/Observable';
import {SocketService} from '../shared/services/socket.service';
import {FIXTURE_USER_ID} from '../main/models/FIXTURE_ID';
import {StateService} from '../store/service/state.service';

@Injectable()
export class UsersService implements OnInit {
	constructor(private socketService: SocketService, private stateService: StateService
	) {}

	public ngOnInit(): void {
	}

	public getCurrentUserData(credentials?: any): Observable<User> {
		return this.socketService.responseSocket('user.get', {id: credentials})
	}

	public initializeUserState(userId: string = FIXTURE_USER_ID): Promise<User> {
		//todo login or register
		return new Promise((resolve, reject) => {
			this.getCurrentUserData(userId)
				.subscribe((user: User) => {
					this.stateService.dispatch('USER_LOGIN', {user: user});
					resolve(user);
				}, error => reject(error))
		})
	}
}
