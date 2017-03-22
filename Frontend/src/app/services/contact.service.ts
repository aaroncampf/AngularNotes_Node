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
				console.log('response', response.json());
				return response.json();
			})
			.catch(err => err);

	}

	public getContact(id: number): Observable<Contact> {
		return this.http.get(`http://angularnotes-angularbros.azurewebsites.net/api/Contact/${id}`)
			.map(response => {
				console.log('response', response.json());
				return response.json();
			})
			.catch(err => err);
	}

	public getCompanyContacts(id: number): Observable<any> {
		return this.http.get(`http://angularnotes-angularbros.azurewebsites.net/api/Contact?CompanyID=${id}`)
			.map(response => {
				console.log('response', response.json());
				return response.json();
			})
			.catch(err => err);
	}

	public saveContact(contact: Contact, companyId?: number): Observable<any> {
		const headers = new Headers({
			'content-type': 'application/json',
		});
		const options = new RequestOptions({headers: headers});
		if(!!contact.ID) {
			console.log('saving with ID');
			return this.http.put(`http://angularnotes-angularbros.azurewebsites.net/api/Contact/${contact.ID}`, JSON.stringify(contact), options)
				.map(res => res)
				.catch(err => this.handleError(err));
		} else if (!!companyId) {
			console.log('saving with cID');
			return this.http.post(`http://angularnotes-angularbros.azurewebsites.net/api/Contact?CompanyID=${companyId}`, JSON.stringify(contact), options)
				.map(res => res)
				.catch(err => this.handleError(err));
		}
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
		console.log(errMsg);
		return Observable.throw(errMsg);
	}


}