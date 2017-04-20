import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class OperationsService {
	public selctionState = Observable.create(observer => {
		observer.next(() => {})
	});
}