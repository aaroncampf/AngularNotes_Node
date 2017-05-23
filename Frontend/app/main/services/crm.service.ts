import {Injectable} from '@angular/core';
import {SocketService} from '../../shared/services/socket.service';
import {Company} from '../models/company.model';
import {CRMType} from '../models/crm-models.type';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class CRMService {
	constructor(private sockets: SocketService) {}

	public dispatched(type: string, payload: any): Observable<CRMType | CRMType[]> {
		return Observable.create((observer: Observer<any>) => {
			console.log('hit', type, payload);
			this.sockets.responseSocket(type.split('_')[1].toLowerCase() + '.' + type.split('_')[2].toLowerCase(), payload)
				 .subscribe(res => {
				 	console.log('', res);
					observer.next(res);
			});

		})
	}

	public getCompanies(payload: any = {}): Promise<Company[]> {
		return new Promise((resolve) => {
			payload.hasOwnProperty('id')
				?
				this.sockets.responseSocket('company.get', {id: payload.id}).subscribe(companies => {
					// this.stateService.dispatch('COMPANIES_GET', {companies: companies});
					resolve(companies);
				})
				:
				this.sockets.responseSocket('companies.get', {}).subscribe(companies => {
					// this.stateService.dispatch('COMPANIES_GET', {companies: companies});
					resolve(companies);
				});
		})
	}

	public getNotes(payload: any = {}): Promise<Company[]> {
		return new Promise((resolve, reject) => {

			payload.hasOwnProperty('id')
				?
				this.sockets.responseSocket('notes.get', {id: payload.id}).subscribe(notes => {
					// this.stateService.dispatch('NOTES_GET', {notes: notes});
					resolve(notes);
				})
				:
				this.sockets.responseSocket('notes.get', {}).subscribe(notes => {
					// this.stateService.dispatch('NOTES_GET', {notes: notes});
					resolve(notes);
				});
		})
	}

	public getQuotes(payload: any = {}): Promise<Company[]> {
		return new Promise((resolve, reject) => {
			payload.hasOwnProperty('id')
				?
				this.sockets.responseSocket('quotes.get', {id: payload.id}).subscribe(quotes => {
					// this.stateService.dispatch('QUOTES_GET', {quotes: quotes});
					resolve(quotes);
				})
				:
				this.sockets.responseSocket('quotes.get', {}).subscribe(quotes => {
					// this.stateService.dispatch('QUOTES_GET', {quotes: quotes});
					resolve(quotes);
				});
		});
	}

	public getContacts(payload: any = {}): Promise<Company[]> {
		return new Promise((resolve, reject) => {
			payload.hasOwnProperty('id')
				?
				this.sockets.responseSocket('contacts.get', {id: payload.id}).subscribe(contacts => {
					// this.stateService.dispatch('CONTACTS_GET', {contacts: contacts});
					resolve(contacts);
				})
				:
				this.sockets.responseSocket('contacts.get', {}).subscribe(contacts => {
					// this.stateService.dispatch('CONTACTS_GET', {contacts: contacts});
					resolve(contacts);
				});
		});
	}
}
