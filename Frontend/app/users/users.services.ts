import {Injectable, OnInit} from '@angular/core';
import {initUser, TWT} from './user.model';
import {Observable} from 'rxjs/Observable';
import {SocketService} from '../shared/services/socket.service';
import {FIXTURE_USER_ID} from '../shared/models/FIXTURE_ID';
import {Subject} from 'rxjs/Subject';
import {RESTService} from '../shared/services/rest.service';
import {Company} from '../shared/models/company.model';
import {Contact} from '../shared/models/contact.model';
import {Quote} from '../shared/models/quote.model';
import {Note} from '../shared/models/note.model';

@Injectable()
export class UsersServices implements OnInit {
	private userStatesSource: Subject<TWT> = new Subject();
	public userState$: Observable<TWT> = this.userStatesSource.asObservable();
	public twt: TWT;
	public path: (endPoint) => string = (endPoint) => {
		return `http://angularnotes-angularbros.azurewebsites.net/api/${endPoint}/`
	};

	constructor(private restService: RESTService,
				private socketService: SocketService){}

	public ngOnInit(): void {
		this.userState$.subscribe(twt => {
			this.twt = twt;
		})
	}

	public setTWTProp(prop:{} | string): void {
		this.userStatesSource.next(this.userStatesSource = Object.assign(this.userStatesSource, this.userStatesSource[Object.keys(prop)[0]], prop));
		if((typeof this.twt.selected) === typeof <Company>{}){
			this.updateCompanyRelations(<Company>{id: this.twt.selected.id});
		}
	}

	//todo add credentials
	public tokenFactory(): Promise<TWT> {
		return new Promise((resolve, reject) => {
			//todo if id else demoId
			this.socketService
				.responseSocket('user.get', {id: FIXTURE_USER_ID})
				.subscribe(user => {
					let token: TWT = <TWT>{};
					Object.assign(token, initUser(user));
					// for (let prop of Object.keys(user)) {
					// 	token[prop] = user[prop];
					// }
					console.log('token', token);
					console.log('user', user);
					resolve(token);
					reject('error with token');
				});
		})
	};

	public updateQuoteRelations(quote: Quote): void {
		this.updateCompanyRelations(<Company>{id: +quote.companyId});
	}

	public updateNoteRelations(note: Note): void {
		this.updateContactRelations(<Contact>{id: note.contactId});
	}

	public updateContactRelations(contact: Contact): void {
		this.restService.callPath('get', this.path('Companies') + contact.companyId).subscribe((company: Company) => {
			Object.assign(this.twt, {selectedRelations: { company: company}});
			this.updateCompanyRelations(company);
		})
	}

	public updateCompanyRelations(company: Company): void {
		this.restService.callPath('get', this.path('Contact') + `?CompanyID=${company.id}`)
			.subscribe((res: Contact[]) => {
				Object.assign(this.twt, {selectedRelations: {company: {contact: res}}});
				this.setTWTProp(this.twt);
				for (let contact of res) {
					this.restService.callPath('get', this.path('Notes') + `?CompanyID=${contact.id}`)
						.subscribe((notes: Note[]) => {
							this.twt.selectedRelations.contacts.forEach(contact => Object.assign(contact, {notes: notes}));
							this.setTWTProp(this.twt);
						});
				}
		});

		this.restService.callPath('get', this.path('Quotes') +`?CompanyID=${company.id}`)
			.subscribe((res: Quote[]) => {
				this.twt.selectedRelations.quotes = <Quote[]>res;
				this.setTWTProp(this.twt);
			});
	}
}