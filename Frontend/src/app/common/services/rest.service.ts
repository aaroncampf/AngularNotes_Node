import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers}from '@angular/http';
import {Observable} from 'RxJS';
import {CRMTypes} from '../models/CRMTypes.type';

const headers = new Headers({
	'content-yype': 'application/json',
});
const options = new RequestOptions({headers: headers});

@Injectable()
export class RESTService {
	constructor(private http: Http){}

	public callPath(verb: string, path: string, payload?: CRMTypes): Observable<CRMTypes | any[]> {
		return this
			.http[verb](path, JSON.stringify(<CRMTypes>payload), options)
			.map(response => <CRMTypes | CRMTypes[]>response.json())
			.catch(err => (err));
	}

	public createPath(payload: CRMTypes, path: string): Observable<CRMTypes> {
		const headers = new Headers({
			'content-type': 'application/json',
		});
		const options = new RequestOptions({headers: headers});
		return this.http.post(path, JSON.stringify(<CRMTypes>payload), options)
			.map(res => {
				return res.json()
			})
			.catch(err => err);
	}
}