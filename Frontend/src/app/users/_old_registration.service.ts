// import {Injectable} from '@angular/core';
// import {SocketService} from '../services/socket.service';
// import * as CryptoJs from 'crypto-js';
// import {AuthService} from '../services/auth.service';
// import {Observable, Subscription} from 'rxjs';
// import {FormData} from '../models/form-data.model';
//
// @Injectable()
// export class RegistrationService {
// 	public crypto: any= CryptoJs;
// 	constructor(private socketService: SocketService, private authService: AuthService){}
//
// 	public register(formData: FormData): Observable<Subscription> {
// 		let body: {} = this.hash(formData.password);
// 		return Observable.of(this.socketService.responseSocket('user.registration', body, 'localhost:1729' )
// 			.subscribe((response:RegistrationResponse) => {
// 			return response
// 			}));
// 	}
//
// 	private hash(clearText: string): any {
// 		this.socketService.responseSocket('auth.hashKey', {}, 'localhost:3591')
// 			.subscribe(key => {
// 			this.crypto.HmacSHA1(clearText, key);
// 		})
// 	}
// }
//
// export interface RegistrationResponse {
// 	clientID: string;
// 	status: string;
// 	redirectionURI: string;
// }