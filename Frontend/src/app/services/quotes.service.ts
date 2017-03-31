import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {Quote} from '../models/quote.model';
import {QuoteLine} from '../models/quotelines.model';

@Injectable()
export class QuoteService {
	constructor(private http: Http){}

	public getQuotes(): Observable<Quote[]> {
		return this.http.get('http://angularnotes-angularbros.azurewebsites.net/api/Quotes')
			.map(response => response.json())
			.catch(err => err);
	}

	public getQuote(id: number): Observable<Quote> {
		return this.http.get(`http://angularnotes-angularbros.azurewebsites.net/api/Quotes/${id}`)
			.map(response => response.json())
			.catch(err => err);
	}

	public getCompanyQuotes(id: any): Observable<any> {
		return this.http.get(`http://angularnotes-angularbros.azurewebsites.net/api/Quotes?CompanyID=${id}`)
			.map(response => response.json())
			.catch(err => err);
	}

	public createQuote(quote: Quote, companyId: number): Observable<any> {
		const headers = new Headers({
			'content-type': 'application/json',
		});
		const options = new RequestOptions({headers: headers});
		return this.http.post(`http://angularnotes-angularbros.azurewebsites.net/api/Quotes?CompanyID=${companyId}`, JSON.stringify(quote), options)
			.map(response => response.json())
			.catch(err => this.handleError(err));
	}

	public getQuoteLines(quoteId: number): Observable<any> {
		return this.http.get(`http://angularnotes-angularbros.azurewebsites.net/api/QuoteLines?QuoteID=${quoteId}`)
			.map(response => {
				console.log('getQuoteLines', response.json());
				return response.json();
			})
			.catch(err => this.handleError(err));
	}

	public updateQuote(quote: Quote): Observable<any> {
		const headers = new Headers({
			'content-type': 'application/json',
		});
		const options = new RequestOptions({headers: headers});
		return this.http.put(`http://angularnotes-angularbros.azurewebsites.net/api/Quotes/${quote.ID}`, JSON.stringify(quote), options)
			.map(response => response)
			.catch(err => this.handleError(err));
	}

	public createQuoteLine(quoteLine: QuoteLine, quote: Quote): Observable<any> {
		const headers = new Headers({
			'content-type': 'application/json',
		});
		const options = new RequestOptions({headers: headers});
		return this.http.post(`http://angularnotes-angularbros.azurewebsites.net/api/QuoteLines?QuoteID=${quote.ID}`, JSON.stringify(quoteLine), options)
			.map(response => response)
			.catch(err => this.handleError(err));
	}

	public updateQuoteLine(quoteLine: QuoteLine): Observable<any> {
		console.log('quotesLine service Update', quoteLine);
		const headers = new Headers({
			'content-type': 'application/json',
		});
		const options = new RequestOptions({headers: headers});
		return this.http.put(`http://angularnotes-angularbros.azurewebsites.net/api/QuoteLines/${quoteLine.ID}`, JSON.stringify(quoteLine), options)
			.map(response => response)
			.catch(err => this.handleError(err));
	}

	public deleteQuote(quoteId: number): Observable<Quote> {
		return this.http.delete(`http://angularnotes-angularbros.azurewebsites.net/api/Quotes/${quoteId}`)
			.map(response => response.json())
			.catch(err => err);
	}

	public deleteQuoteLine(quoteId: number): Observable<Quote> {
		return this.http.delete(`http://angularnotes-angularbros.azurewebsites.net/api/QuoteLines/${quoteId}`)
			.map(response => response.json())
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