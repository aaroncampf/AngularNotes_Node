import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {Note} from '../models/note.model';

@Injectable()
export class NotesService {

	constructor(private http: Http){}

	public newNote(note: Note, contactId: number): Observable<any> {
		const headers = new Headers({
			'content-type': 'application/json'
		});
		const options = new RequestOptions({headers: headers});
			return this.http.post(`http://angularnotes-angularbros.azurewebsites.net/api/Notes?ContactID=${contactId}`, JSON.stringify(note), options)
				.map(res => res)
				.catch(err => this.handleError(err));
		}

	public updateNote(note: Note): Observable<any> {
		const headers = new Headers({
			'content-type': 'application/json'
		});
		const options = new RequestOptions({headers: headers});
		return this.http.put(`http://angularnotes-angularbros.azurewebsites.net/api/Notes/${note.ID}`, JSON.stringify(note), options)
			.map(res => res)
			.catch(err => this.handleError(err));
	}

	public getNotes(): Observable<Note[]> {
		return this.http.get(`http://angularnotes-angularbros.azurewebsites.net/api/Notes`)
			.map(response => {
				return response.json();
			})
			.catch(err => err);
	}

	public deleteNote(noteId: number): Observable<Note> {
		return this.http.delete(`http://angularnotes-angularbros.azurewebsites.net/api/Notes/${noteId}`)
			.map(response => {
				return response.json();
			})
			.catch(err => err);
	}

	public getContactNotes(id: number): Observable<Note[]> {
			return this.http.get(`http://angularnotes-angularbros.azurewebsites.net/api/Notes?ContactID=${id}`)
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
		console.log(errMsg);
		return Observable.throw(errMsg);
	}

}