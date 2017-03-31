import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {Settings} from '../models/setting.model';

@Injectable()
export class UserService{
	constructor(private http: Http) {
	}

	public getSettings(id: number): Observable<Settings> {
		return this.http.get(`http://angularnotes-angularbros.azurewebsites.net/settings/${id}`)
			.map(response => {
				return response.json();
			})
			.catch(err => err);
	}

}