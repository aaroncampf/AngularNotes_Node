import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {Settings} from '../models/setting.model';
import * as io from 'socket.io-client';

@Injectable()
export class UserService{
	private socket = io.connect('localhost:1729', {
		reconnection: true
	});
	constructor(private http: Http) {
	}

	public getSettings(id: number): Observable<Settings> {
		this.socket.connect('localhost:1729');
		this.socket.emit('get.user', id);
		return Observable.of(this.socket.on('get.user', (response:Settings) =><Settings>response,
			error => console.log('getSettings error', error)));
	}

}