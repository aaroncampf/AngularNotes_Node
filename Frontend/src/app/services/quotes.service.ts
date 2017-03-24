import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {Quote} from '../models/quote.model';

@Injectable()
export class QuoteService {
	constructor(private http: Http){}

	public getQuotes(): Observable<Quote[]> {
		return this.http.get('http://angularnotes-angularbros.azurewebsites.net/api/Quote')
			.map(response => {
				console.log('response', response.json());
				return response.json();
			})
			.catch(err => err);
	}

	public getQuote(id: number): Observable<Quote> {
		return this.http.get(`http://angularnotes-angularbros.azurewebsites.net/api/Quote/${id}`)
			.map(response => {
				return response.json();
			})
			.catch(err => err);
	}

	public getCompanyQuotes(id: any): Observable<any> {
		return this.http.get(`http://angularnotes-angularbros.azurewebsites.net/api/Quote?CompanyID=${id}`)
			.map(response => {
				return response.json();
			})
			.catch(err => err);
	}

	public saveNewQuote(quote: Quote, companyId?: number): Observable<any> {
		const headers = new Headers({
			'content-type': 'application/json',
		});
		const options = new RequestOptions({headers: headers});
		return this.http.post(`http://angularnotes-angularbros.azurewebsites.net/api/Quote?CompanyID=${companyId}`, JSON.stringify(quote), options)
			.map(res => {
				return res;
			})
			.catch(err => this.handleError(err));
	}
	public updateQuote(quote: Quote, id: number): Observable<any> {
		const headers = new Headers({
			'content-type': 'application/json',
		});
		const options = new RequestOptions({headers: headers});
		return this.http.put(`http://angularnotes-angularbros.azurewebsites.net/api/Quote/${id}`, JSON.stringify(quote), options)
			.map(res => {
				return res;
			})
			.catch(err => this.handleError(err));
	}

	public deleteQuote(quoteId: number): Observable<Quote> {
		return this.http.delete(`http://angularnotes-angularbros.azurewebsites.net/api/Quote/${quoteId}`)
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