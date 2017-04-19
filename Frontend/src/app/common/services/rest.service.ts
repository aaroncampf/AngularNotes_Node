import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers}from '@angular/http';
import {Observable} from 'RxJS';

export const OPTIONS =  () => {
	 const headers = new Headers({
		'content-type': 'application/json',
	});
	return new RequestOptions({headers: headers});
};

@Injectable()
export class RESTService {
	constructor(private http: Http){}

	public callPath(verb: string, path: string, payload?: {}): Observable<any> {
		return this.http[verb](path, JSON.stringify(payload), OPTIONS)
			.map(response => response.json())
			.catch(err => new Error(err.json()));
	}
}