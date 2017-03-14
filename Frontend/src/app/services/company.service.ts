import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Http, Response} from '@angular/http';

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
}