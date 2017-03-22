import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {Contact} from '../models/contact.model';

@Injectable()
export class ContactService {
	constructor(private http: Http){}

	public getContact(id: number): Observable<Contact> {
		return this.http.get(`http://angularnotes-angularbros.azurewebsites.net/api/Contact/${id}`)
			.map(response => {
				console.log('response', response.json());
				return response.json();
			})
			.catch(err => err);
	}

	public getCompanyContacts(id: any): Observable<any> {
		return this.http.get(`http://angularnotes-angularbros.azurewebsites.net/api/Contact?CompanyID=${id}`)
			.map(response => {
				console.log('getCompanyContacts response', response.json());
				return response.json();
			})
			.catch(err => err);
	}

	public deleteContact(contactId: number): Observable<Contact> {
		return this.http.delete(`http://angularnotes-angularbros.azurewebsites.net/api/Contact/${contactId}`)
			.map(response => {
				console.log('deleteContact response', response.json());
				return response.json();
			})
			.catch(err => err);
	}
}