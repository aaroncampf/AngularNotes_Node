import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Company} from '../models/company.model';
import {Contact} from '../models/contact.model';
import {Quote} from '../models/quote.model';

@Injectable()
export class DataShareService {
	private activeCompanySource = new BehaviorSubject<Company>(<Company>{});
	private activeContactSource = new BehaviorSubject<Contact>(<Contact>{});
	private activeQuoteSource = new BehaviorSubject<Quote>(<Quote>{});
	private activeNavVisibleSource = new BehaviorSubject<boolean>(true);
	public companySelected$ = this.activeCompanySource.asObservable();
	public contactSelected$ = this.activeContactSource.asObservable();
	public quoteSelected$ = this.activeQuoteSource.asObservable();
	public navVisible$ = this.activeNavVisibleSource.asObservable();

	public sendCompany(company: Company): void {
		this.activeCompanySource.next(company);
	}

	public sendContact(contact: Contact): void {
		this.activeContactSource.next(contact);
	}

	public sendQuote(quote: Quote): void {
		this.activeQuoteSource.next(quote);
	}

	public isNavVisible(state: boolean): void {
		this.activeNavVisibleSource.next(state);
	}
}