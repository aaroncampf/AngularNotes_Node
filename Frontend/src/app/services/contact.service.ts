import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {Contact} from '../models/contact.model';

@Injectable()
export class ContactService {
	constructor(private http: Http){}

	public getContacts(): Observable<Contact[]> {
		return this.http.get('http://angularnotes-angularbros.azurewebsites.net/api/Contact')
			.map(response => {
				return response.json();
			})
			.catch(err => err);
	}

	// public getContact(id: number): Observable<Contact> {
	// 	return this.http.get(`http://angularnotes-angularbros.azurewebsites.net/api/Contact/${id}`)
	// 		.map(response => {
	// 			return response.json();
	// 		})
	// 		.catch(err => err);
	// }

	public getCompanyContacts(id: any): Observable<any> {
		return this.http.get(`http://angularnotes-angularbros.azurewebsites.net/api/Contact?CompanyID=${id}`)
			.map(response => {
				return response.json();
			})
			.catch(err => err);
	}

	public createContact(companyId: number): Observable<any> {
		const headers = new Headers({
			'content-type': 'application/json',
		});
		const options = new RequestOptions({headers: headers});
		return this.http.post(`http://angularnotes-angularbros.azurewebsites.net/api/Contact?CompanyID=${companyId}`, <Contact>{}, options)
			.map(res => {
				return res;
			})
			.catch(err => this.handleError(err));
	}

	public updateContact(contact: Contact, id: number): Observable<any> {
		const headers = new Headers({
			'content-type': 'application/json',
		});
		const options = new RequestOptions({headers: headers});
		return this.http.put(`http://angularnotes-angularbros.azurewebsites.net/api/Contact/${id}`, JSON.stringify(contact), options)
			.map(res => {
				return res;
			})
			.catch(err => this.handleError(err));
	}

	public deleteContact(contactId: number): Observable<Contact> {
		return this.http.delete(`http://angularnotes-angularbros.azurewebsites.net/api/Contact/${contactId}`)
			.map(response => {
				return response.json();
			})
			.catch(err => err);
	}

	private handleError(error: Error | any) {
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.err || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		return Observable.throw(errMsg);
	}


}