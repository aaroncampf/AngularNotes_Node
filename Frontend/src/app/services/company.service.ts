import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
// import {map} from 'rxjs/operator/map';

@Injectable()
export class CompanyService {

	constructor(private http: Http){};

	public getCompanies(): Observable<any> {
		return this.http.get('http://angularnotes-angularbros.azurewebsites.net/api/companies')
			.map(results => results.json())
			.catch((error: Response | any) => {
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
			});
	}

	// public saveCompanyProp(companyId:number, propName: string, propValue: string): any {
	// 	const headers = new Headers({
	// 		'content-type': 'application/json',
	// 	});
	// 	const options = new RequestOptions({headers: headers});
	// 	return this.http.put('http://angularnotes-angularbros.azurewebsites.net/api/companies/' + companyId,JSON.stringify({{Name: propValue}), options)
	// 		.map((res: Response) => {
	// 			return res.json().data || {};
	// 		})
	// 		.catch(this.handleError);
	// }
	//
	// private handleError(error: Response | any) {
	// 	let errMsg: string;
	// 	if (error instanceof Response) {
	// 		const body = error.json() || '';
	// 		const err = body.err || JSON.stringify(body);
	// 		errMsg = `${error.status} - ${error.statusText || ''} ${err}`
	// 	} else {
	// 		errMsg = error.message ? error.message : error.toString();
	// 	}
	// 	console.log(errMsg);
	// 	return Observable.throw(errMsg);
	// }

}