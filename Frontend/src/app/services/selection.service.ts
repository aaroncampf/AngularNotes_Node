import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Company} from '../models/company.model';

@Injectable()
export class SelectionService {
	private activeCompanySource = new BehaviorSubject<Company>(<Company>{});
	constructor(){
	}
	public companySelected$ = this.activeCompanySource.asObservable();

	sendCompany(company: Company) {
		console.log('retrieving', company);
		this.activeCompanySource.next(company);
	}
}