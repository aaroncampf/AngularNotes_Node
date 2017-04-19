import {Injectable} from '@angular/core';
import * as IO from 'socket.io-client';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SocketService {
	public io;

	public responseSocket(pathVerb: string, payload: {}): Observable<any> {
		console.log('socket?', this.io);
		this.io = IO('localhost:1729', {transport: ['polling', 'websocket']});
		this.io.emit(pathVerb, payload);
		return Observable.of(this.io.on(pathVerb + '.response', payload => {
			console.log(payload);
		})).map(payload => payload)
	}
}