import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';

@Injectable()
export class ContactService {

	constructor(private http: Http){}

	public getContacts(): Observable<any> {
		return this.http.get('http://angularnotes-angularbros.azurewebsites.net/api/Contact')
			.map(response => response)
			.catch(err => err);

	}
}