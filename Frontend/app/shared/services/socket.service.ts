import {Injectable} from '@angular/core';
import * as IO from 'socket.io-client';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SocketService {
	public io: IO = IO('localhost:1729', {transport: ['polling', 'websocket']});

	public responseSocket(pathVerb: string, payload?: any): Observable<any> {
		this.io.emit(pathVerb, payload);
		// this.io = IO('52.55.177.110:1729', {transport: ['polling', 'websocket']});
		return Observable.create(observer => {
			this.io.on(pathVerb + '.response', payload =>{
				observer.next(payload);
				observer.complete();
				observer.error('There was an error with socket service.')
			 });
		 });
	}
}