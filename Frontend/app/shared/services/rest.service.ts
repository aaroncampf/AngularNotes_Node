import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers}from '@angular/http';
import {CRMType} from '../models/CRMTypes.type';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import {keysToCamelCase} from '../helper/TitleToCamelCase';

@Injectable()
export class RESTService {
	private headers = new Headers({'content-type': 'application/json'});
	private options = new RequestOptions({headers: this.headers});
	private keysToCamelCase = keysToCamelCase;
	constructor(public http: Http) {}

	public callPath(verb: string, path: string, payload?: CRMType): Observable<CRMType[] | CRMType> {
		switch (verb) {
			case'get':
			return this.http.get(path, this.options)
					.map((response: any) => {
						return this.keysToCamelCase(JSON.parse(response._body));
					})
					.catch(err => (err));
			case'post':
				return this.http.post(path, JSON.stringify(payload), this.options)
					.map((response: any) => {
						return this.keysToCamelCase(JSON.parse(response._body));
					})
					.catch(err => (err));
			case'put':
				return this.http.put(path, JSON.stringify(payload), this.options)
					.map((response: any) => {
						return this.keysToCamelCase(JSON.parse(response._body));
					})
					.catch(err => (err));
		}
	}

	public createPath(payload: CRMType, path: string): Observable<CRMType> {
		const headers = new Headers({
			'content-type': 'application/json',
		});
		const options = new RequestOptions({headers: headers});
		return this.http.post(path, JSON.stringify(<CRMType>payload), options)
			.map((response: any) => {
				return this.keysToCamelCase(JSON.parse(response._body));
			})
			.catch(err => err);
		// }
	}

}