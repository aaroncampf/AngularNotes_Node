import {Injectable} from '@angular/core';
import {SocketService} from '../../shared/services/socket.service';
import {Company} from '../models/company.model';
import {CRMType} from '../models/crm-models.type';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Contact} from '../models/contact.model';
import {Quote, QuoteLine} from '../models/quote.model';
import {Note} from '../models/note.model';
import {User} from '../models/user.model';

@Injectable()
export class CRMDataService {
	constructor(private sockets: SocketService) {}

	public dispatched(type: string, payload: any): Observable<CRMType | CRMType[]> {
		console.log('dispatched', payload);
		return Observable.create((observer: Observer<any>) => {
			this.sockets.responseSocket(type.split('_')[0].toLowerCase() + '.' + type.split('_')[1].toLowerCase(), payload)
				.subscribe(res => {
				 	console.log('SOCKET RESPONSE FROM SERVICE CALL', res);
					observer.next(res);
					return res;
			});

		})
	}

	public newContact(payload): Promise<Contact> {
		return new Promise((resolve, reject) => {
			this.sockets.responseSocket('contact.create', payload).subscribe(contact => {
				console.log('contact create response', contact);
				if (typeof contact === 'string'){
					reject(contact);
				} else {
					resolve(contact);
				}
			})
		})
	}

	public newNote(payload): Promise<Note> {
		return new Promise((resolve, reject) => {
			this.sockets.responseSocket('note.create', payload).subscribe(note => {
				console.log('note create response', note);
				if (typeof note === 'string'){
					reject(note);
				} else {
					resolve(note);
				}
			})
		})
	}

	public setNote(payload): Promise<Note> {
		return new Promise((resolve) => {
			this.sockets.responseSocket('note.set', payload).subscribe(note => {
				resolve(note);
			})
		})
	}

	public removeNote(payload): Promise<any> {
		return new Promise((resolve) => {
			this.sockets.responseSocket('note.destroy', payload).subscribe(res => {
				resolve(res);
			})
		})
	}

	public newQuote(payload): Promise<Quote> {
		return new Promise((resolve, reject) => {
			this.sockets.responseSocket('quote.create', payload).subscribe(quote => {
				console.log('quote create response', quote);
				if (typeof quote === 'string'){
					reject(quote);
				} else {
					resolve(quote);
				}
			})
		})
	}

	public newQuoteLine(payload): Promise<QuoteLine> {
		return new Promise((resolve, reject) => {
			this.sockets.responseSocket('quoteLine.create', payload).subscribe(quoteLine => {
				console.log('quoteLine create response', quoteLine);
				if (typeof quoteLine === 'string'){
					reject(quoteLine);
				} else {
					resolve(quoteLine);
				}
			})
		})
	}

	public setQuote(payload): Promise<Quote> {
		return new Promise((resolve, reject) => {
			this.sockets.responseSocket('quote.set', payload).subscribe(quote => {
				console.log('quote set response', quote);
				if (typeof quote === 'string'){
					reject(quote);
				} else {
					resolve(quote);
				}
			})
		})
	}


	public setQuoteLine(payload): Promise<QuoteLine> {
				console.log('quoteLine set ', payload);
		return new Promise((resolve, reject) => {
			this.sockets.responseSocket('quoteLine.set', payload).subscribe(quoteLine => {
				console.log('quoteLine set response', quoteLine);
				if (typeof quoteLine === 'string'){
					reject(quoteLine);
				} else {
					resolve(quoteLine);
				}
			})
		})
	}

	public deleteQuoteLine(payload): Promise<Company> {
		return new Promise((resolve) => {
			this.sockets.responseSocket('quoteLine.destroy', payload).subscribe(company => {
				resolve(company);
			})
		})

	}


	public newCompany(payload): Promise<Company> {
		return new Promise((resolve, reject) => {
			this.sockets.responseSocket('company.create', payload).subscribe(company => {
				if (typeof company === 'string'){
					reject(company);
				} else {
					resolve(company);
				}
			})
		})
	}

	public setCompany(payload): Promise<Company> {
		return new Promise((resolve) => {
			this.sockets.responseSocket('company.set', payload).subscribe(company => {
				resolve(company);
			})
		})

	}

	public setContact(payload): Promise<Company> {
		return new Promise((resolve) => {
			this.sockets.responseSocket('contact.set', payload).subscribe(contact => {
				resolve(contact);
			})
		})

	}

	public deleteCompany(payload): Promise<Company> {
		return new Promise((resolve) => {
			this.sockets.responseSocket('company.delete', payload).subscribe(company => {
				resolve(company);
			})
		})

	}

	public getCompanies(payload:{}): Promise<(Company[] | Company)> {
		return new Promise((resolve) => {
			payload.hasOwnProperty('id')
				?
				this.sockets.responseSocket('company.get', payload).subscribe(companies => {
					resolve(companies);
				})
				:
				this.sockets.responseSocket('companies.get', {}).subscribe(companies => {
					resolve(companies);
				});
		})
	}

	public getNotes(payload: any = {}): Promise<Note[]> {
		return new Promise((resolve, reject) => {
			console.log('GetNotes', payload);
				this.sockets.responseSocket('notes.get', payload).subscribe(notes => {
						console.log('NOTES GET RESPONSE', notes);
						resolve(notes);
				});
		})
	}

	public getQuote(payload): Promise<Quote> {
		return new Promise((resolve, reject) => {
			this.sockets.responseSocket('quote.get', payload).subscribe(quotes => {
				console.log(quotes);
				resolve(quotes);
			})
		});
	}

	public getQuotes(payload: any = {}): Promise<Quote[]> {
		return new Promise((resolve, reject) => {
			this.sockets.responseSocket('quotes.get', payload).subscribe(quotes => {
				// this.stateService.dispatch('QUOTES_GET', {quotes: quotes});
				resolve(quotes);
			})
		});
	}

	public deleteQuote(payload): Promise<any> {
		return new Promise((resolve) => {
			this.sockets.responseSocket('quote.destroy', payload).subscribe(response => {
				resolve(response);
			})
		})
	}

	public getContacts(payload: {}): Promise<Contact[] | Contact> {
		return new Promise((resolve) => {
			this.sockets.responseSocket('contacts.get', payload).subscribe(contacts => {
				resolve(contacts);
			});
		});
	}

	public deleteContact(payload): Promise<any> {
		return new Promise((resolve) => {
			this.sockets.responseSocket('contact.destroy', payload).subscribe(response => {
				resolve(response);
			})
		})
	}


	public getUser(payload): Promise<User> {
		return new Promise((resolve) => {
			this.sockets.responseSocket('user.get', payload).subscribe(user => {
				resolve(user);
			})
		})
	}

	public setUser(payload): Promise<User> {
		return new Promise((resolve) => {
			this.sockets.responseSocket('user.set', payload).subscribe(user => {
				resolve(user);
			})
		})
	}
}
