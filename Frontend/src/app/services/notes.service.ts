import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {Contact} from '../models/contact.model';
import {Note} from '../models/note.model';

@Injectable()
export class NotesService {

	constructor(private http: Http){}

	public saveNote(note: Note, contactId: number): Observable<any> {
		const headers = new Headers({
			'content-type': 'application/json'
		});
		const options = new RequestOptions({headers: headers});
			return this.http.post(`http://angularnotes-angularbros.azurewebsites.net/api/Notes?ContactID=${contactId}`, JSON.stringify(note), options)
				.map(res => res)
				.catch(err => this.handleError(err));
		}

	public getNotes(): Observable<Note[]> {
		return this.http.get(`http://angularnotes-angularbros.azurewebsites.net/api/Notes`)
			.map(response => {
				console.log('getNote response', response.json());
				return response.json();
			})
			.catch(err => err);
	}

	public getContactNotes(contactId: number): Observable<Note[]> {
			return this.http.get(`http://angularnotes-angularbros.azurewebsites.net/api/Notes?ContactID=${contactId}`)
				.map(response => {
					console.log('getContactNote response', response.json());
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
		console.log(errMsg);
		return Observable.throw(errMsg);
	}

}