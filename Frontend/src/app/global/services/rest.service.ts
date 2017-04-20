import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers}from '@angular/http';
import {Observable} from 'RxJS';
import {CRMType} from '../models/CRMTypes.type';

const headers = new Headers({
	'content-yype': 'application/json',
});
const options = new RequestOptions({headers: headers});

@Injectable()
export class RESTService {
	constructor(private http: Http){}

	public callPath(verb: string, path: string, payload?: CRMType): Observable<CRMType | any[]> {
		return this
			.http[verb](path, JSON.stringify(<CRMType>payload), options)
			.map(response => <CRMType | CRMType[]>response.json())
			.catch(err => (err));
	}

	public createPath(payload: CRMType, path: string): Observable<CRMType> {
		const headers = new Headers({
			'content-type': 'application/json',
		});
		const options = new RequestOptions({headers: headers});
		return this.http.post(path, JSON.stringify(<CRMType>payload), options)
			.map(res => {
				return res.json()
			})
			.catch(err => err);
	}
}