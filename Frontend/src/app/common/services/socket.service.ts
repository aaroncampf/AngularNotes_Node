import {Injectable} from '@angular/core';
import * as IO from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable()
export class SocketService {
	public io = IO.connect('1729', {transport: ['websocket'], path: '/user.get'});

	public responseSocket(pathVerb: string, body: {}): Promise<any> {
		return new Promise((resolve, reject) => {
			console.log('socket?', this.io);
			this.io.emit(pathVerb, body);
			this.io.on(pathVerb + '.response', response => {
				resolve(response);
			});
		})
	}

}