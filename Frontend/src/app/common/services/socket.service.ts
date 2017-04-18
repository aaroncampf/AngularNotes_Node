import {Injectable} from '@angular/core';
import * as IO from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable()
export class SocketService {
	public io = IO;
	public responseSocket(pathVerb: string, body: {}): Observable<{}> {
	this.io.connect('localhost:1729');
	// this.io.connect('52.55.177.110:1729');
		return Observable.of((res) => {
			this.io.emit(pathVerb , body);
			this.io.on(pathVerb + '.response', response => {
				console.log('socket response', response);
				res(response);
			});
		});
	}

}