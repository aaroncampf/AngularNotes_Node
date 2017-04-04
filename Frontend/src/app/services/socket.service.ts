import {Injectable} from '@angular/core';
import * as IO from 'socket.io-client';

@Injectable()
export class SocketService {
	public io = IO.connect('52.55.177.110:1729');
	public socketCouple(path: string, body: {}): Promise<{}> {
		console.log('hit');
		return new Promise((res) => {
			this.io.emit(path, body);
			this.io.on(path, response => {
				console.log(response);
				res(response);
			});
		});

	}
}