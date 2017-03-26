import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Company} from '../models/company.model';

@Injectable()
export class CompanyService {
	constructor(private http: Http){};

	public getCompanies(): Observable<any> {
		return this.http.get('http://angularnotes-angularbros.azurewebsites.net/api/companies')
			.map(results => results.json())
			.catch(err => this.handleError(err));
	}
	public getCompany(id: number): Observable<any> {
		console.log(id);
		return this.http.get('http://angularnotes-angularbros.azurewebsites.net/api/companies/' + id)
			.map(results => results.json())
			.catch(err => this.handleError(err));
	}

	public updateCompany(company: Company): Observable<Company> {
		const headers = new Headers({
			'content-type': 'application/json',
		});
		const options = new RequestOptions({headers: headers});
		console.log('updating with',company);
			return this.http.put(`http://angularnotes-angularbros.azurewebsites.net/api/companies/${company.ID}`, JSON.stringify(company), options)
					.map(res => {
						console.log('update', res.json());
						return res.json()
					})
					.catch(err => this.handleError(err));
		}

// public saveCompany(company: Company): Observable<Company> {
// 		const headers = new Headers({
// 			'content-type': 'application/json',
// 		});
// 		const options = new RequestOptions({headers: headers});
// 		if (!company.ID) {
// 			return this.http.post('http://angularnotes-angularbros.azurewebsites.net/api/companies', JSON.stringify(company), options)
// 					.map(res => {
// 						console.log('saveCompany no ID res', res.json());
// 						return res.json()
// 					})
// 					.catch(err => this.handleError(err));
// 		} else {
// 			return this.http.put('http://angularnotes-angularbros.azurewebsites.net/api/companies/' + company.ID,
// 				JSON.stringify(company), options)
// 					.map(res => res)
// 					.catch(err => this.handleError(err));
// 		}
// 	}

	public deleteCompany(id: number): Observable<any> {
		return this.http.delete('http://angularnotes-angularbros.azurewebsites.net/api/companies/' + id)
			.map(results => results.json())
			.catch(err => this.handleError(err));
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