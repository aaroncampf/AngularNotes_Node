import {Injectable} from '@angular/core';
import * as IO from 'socket.io-client';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SocketService {
	public io;
	public responseSocket(pathVerb: string, payload: any): Observable<any> {
		// this.io = IO('52.55.177.110:1729', {transport: ['polling', 'websocket']});
		this.io = IO('localhost:1729', {transport: ['polling', 'websocket']});
		this.io.emit(pathVerb, payload);
		return Observable.create(observer => {
			this.io.on(pathVerb + '.response', payload =>{
				observer.next(payload);
				observer.complete();
			 });
		 });
	}
}