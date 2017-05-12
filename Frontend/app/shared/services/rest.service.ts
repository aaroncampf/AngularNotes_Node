import {Injectable, OnInit} from '@angular/core';
import {Http, RequestOptions, Headers, Response}from '@angular/http';
import {CRMType} from '../models/crm-models.type';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'

@Injectable()
export class RESTService implements OnInit {
	private headers = new Headers({'content-type': 'application/json'});
	private options;
	constructor(public http: Http) {}

	public ngOnInit(){
		this.options = new RequestOptions({headers: this.headers});
	}
	public callPath(verb: string, path: string, payload?: CRMType): Observable<CRMType[] | CRMType> {
		switch (verb) {
			case'get':
				return this.http.get(path, this.options)
					.map((response: any) => {
						return JSON.parse(response._body);
					})
					.catch((error: Response | any) => this.handleError(error));
			case'post':
				return this.http.post(path, JSON.stringify(payload), this.options)
					.map((response: any) => {
						return JSON.parse(response._body);
					})
					.catch((error: Response | any) => this.handleError(error));
			case'put':
				return this.http.put(path, JSON.stringify(payload), this.options)
					.map((response: any) => {
						return JSON.parse(response._body);
					})
					.catch((error: Response | any) => this.handleError(error));
		}
	}

	public createPath(payload: CRMType, path: string): Observable<CRMType> {
		const headers = new Headers({
			'content-type': 'application/json',
		});
		const options = new RequestOptions({headers: headers});
		return this.http.post(path, JSON.stringify(<CRMType>payload), options)
			.map((response: any) => {
				return JSON.parse(response._body);
			})
			.catch((error: Response | any) => this.handleError(error));
	}

	public getPath(path: string): Observable<CRMType| CRMType[]> {
		const headers = new Headers({
			'content-type': 'application/json',
		});
		const options = new RequestOptions({headers: headers});
		return this.http.get(path, options)
			.map((response: any) => {
				const res = response;
				return JSON.parse(res._body);
			})
			.catch((error: Response | any) => this.handleError(error));
		// }
	}

	private handleError (error: Response | any) {
		// In a real world app, you might use a remote logging infrastructure
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}


}