import {Injectable} from '@angular/core';
import * as IO from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable()
export class SocketService {
public io;
	public responseSocket(pathVerb: string, body: {}): Promise<any> {

			console.log('socket?', this.io);
		this.io = IO('localhost:1729', {transport: ['polling', 'websocket']});
		this.io.connect('user.get');
		return new Promise((resolve, reject) => {
			resolve(this.io.on('user.response', (response: any) => {
				console.log('15', response);
			}));

		});
		console.log('handler', handler);
		handler.emit('user.get', ['one', 'two'], response => {
			console.log('ack?', response);
		});
			return new Promise((resolve, reject) => {
				this.io.on(pathVerb + '.response', handler => {
					this.io.emit(pathVerb, body);
						resolve(handler);
					});
				})
	}

}