import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {TWT} from './user.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UsersServices {
	private userStatesSource: BehaviorSubject<TWT> = new BehaviorSubject(<TWT>{});

	public userState$: Observable<TWT> = this.userStatesSource.asObservable();

	public setTWTProp(prop:{}): void {
		this.userStatesSource
			.next(Object.assign(this.userStatesSource[Object.keys(prop)[0]], prop));
	}
}