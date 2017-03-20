// import {Injectable} from '@angular/core';
// import {Http} from '@angular/http';
// import {Observable} from 'rxjs';
//
// @Injectable()
// export class ContactService {
//
// 	constructor(private http: Http){}
//
// 	public getContacts(companyId: number): Observable<any> {
// 		return this.http.get('http://angularnotes-angularbros.azurewebsites.net/api/Contact/' + companyId)
// 			.map(response => response)
// 			.catch((err: any) => {
// 				console.log(err);
// 				return void 0;
// 			})
// 	}
// }