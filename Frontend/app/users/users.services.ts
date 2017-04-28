import {Injectable} from '@angular/core';
import {initUser, TWT} from './user.model';
import {Observable} from 'rxjs/Observable';
import {SocketService} from '../shared/services/socket.service';
import {FIXTURE_USER_ID} from '../shared/models/FIXTURE_ID';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class UsersServices {
	private userStatesSource: Subject<TWT> = new Subject();
	public userState$: Observable<TWT> = this.userStatesSource.asObservable();
	public setTWTProp(prop:{} | string): void {
		this.userStatesSource.next(this.userStatesSource = Object.assign(this.userStatesSource, this.userStatesSource[Object.keys(prop)[0]], prop));
	}
}