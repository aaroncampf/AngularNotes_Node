import {Injectable} from '@angular/core';
import * as IO from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable()
export class SocketService {
	public io = IO;

	constructor( ){}
	public hotSocketCouple(path: string, body: {}, modulePort: string): Observable<{}> {

	this.io.connect(modulePort);
		return Observable.of((res) => {
			this.io.emit(path, body);
			this.io.on(path, response => {
				console.log(response);
				res(response);
			});
		});
	}

}