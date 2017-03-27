import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Company} from '../models/company.model';
import {Contact} from '../models/contact.model';

@Injectable()
export class DataShareService {
	private activeCompanySource = new BehaviorSubject<Company>(<Company>{});
	private activeContactSource = new BehaviorSubject<Contact>(<Contact>{});
	constructor(){
	}
	public companySelected$ = this.activeCompanySource.asObservable();
	public contactSelected$ = this.activeContactSource.asObservable();

	public sendCompany(company: Company): void {
		console.log('retrieving', company);
		this.activeCompanySource.next(company);
	}

	public sendContact(contact: Contact): void {
		this.activeContactSource.next(contact)
	}
}