import {Injectable} from '@angular/core';
import {SocketService} from '../../shared/services/socket.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EmailerService {
	constructor(private sockets: SocketService){}

	public sendEmailWithTemplate(template, sendToEmail, emailSubject): Observable<any> {
		return Observable.create(observer => {
			this.sockets.responseSocket('email.quote', {
				template: template,
				sendTo: sendToEmail,
				subject: emailSubject
			}).subscribe(res => {
					observer.next(res);
					observer.complete();
				});
		})
	}
}