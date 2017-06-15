import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CRMStoreService} from '../../services/crm-store.service';
import {CRMDataService} from '../../services/crm-data.service';
import {ToastsManager} from 'ng2-toastr';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Quote} from '../../models/quote.model';
import {Subscription} from 'rxjs/Subscription';
import {Contact} from '../../models/contact.model';

@Component({
	selector: 'quotes-component',
	template: `
	<data-loading-screen [dataReady]="!!dataReady"></data-loading-screen>
	<div *ngIf="!!dataReady">
		<button class="btn btn-block" [routerLink]="['/Add-Quote']">Create A Quote</button>
		<ul class="crm-list">
			<li class="crm-list-item" *ngFor="let quote of (quotes$ | async)">
				<quote-icons class="crm-list-item-icons">
					<button class="btn btn-sm btn-default dropdown-toggle" type="button" id="contactDropDown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
						<span class="icon icon-share"></span>
					</button>
					<ul class="dropdown-menu contact" aria-labelledby="contactDropDown">
						Share With:
						<li *ngFor="let contact of contactsWithCompanyID(quote.company_id)" (click)="routeWithContactDispatch(contact, quote, ['/Quote-Template'])"><strong>{{contact.name}}</strong></li>
					</ul>
				</quote-icons>
				<quote-name class="crm-list-item-title" (click)="routeWithDispatch(quote, ['/Quote'])">{{quote.name}}
				</quote-name>
			</li>
		</ul>
	</div>
	`,
})
export class QuotesComponent implements OnInit, OnDestroy {
	public dataReady: boolean = false;
	private quotesSource: BehaviorSubject<Quote[]> = new BehaviorSubject<Quote[]>([]);
	public quotes$: Observable<Quote[]> = this.quotesSource.asObservable();
	private contactsSource: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);
	private stateSub: Subscription;
	constructor(
		private router: Router,
		public toastr: ToastsManager,
		public crmStore: CRMStoreService,
		public crmData: CRMDataService
	){}

	public ngOnInit(): void {

		this.crmData.getContacts({})
			.then((contacts: Contact[])=> this.contactsSource.next(contacts));
		this.stateSub = this.crmStore.crmStore$.subscribe(state => {
			// cleared in case of user reselecting
			this.quotesSource.next([]);
			if(state.selectedCompany && state.selectedCompany.id){
				this.crmData.getQuotes({owner_id: state.selectedCompany.id})
					.then((quotes: Quote[] )=> {
						this.quotesSource.next(quotes);
						this.dataReady = true;
				})
			} else {
				this.crmData.getQuotes({})
					.then((quotes: Quote[]) => {
						this.quotesSource.next(quotes);
						this.dataReady = true
				});
			}
		});
	}

	public ngOnDestroy(){
		this.stateSub.unsubscribe();
	}

	public contactsWithCompanyID(companyID: string): Quote[] {
		let responseArray = [];
		const contacts = this.contactsSource.value;
		for(let contact of contacts){
			if(contact.company_id === companyID){
				responseArray.push(contact);
			}
		}
		return responseArray;
	}

	public routeWithDispatch(quote, route): void {
		this.crmData.getCompanies({id: quote.company_id})
			.then(company => {
				this.crmStore.crmStoreDispatcher({type: 'COMPANY_SELECTED', payload: {company: company}});
				this.crmStore.crmStoreDispatcher({type: 'QUOTE_SELECTED', payload: {quote: quote}});
				this.router.navigate(route);
		});
	}

	public routeWithContactDispatch(contact, quote, route): void {
		this.crmData.getCompanies({id: contact.company_id})
			.then(company => {
				this.crmStore.crmStoreDispatcher({type: 'CONTACT_SELECTED', payload: {contact: contact, company: company}});
				this.crmStore.crmStoreDispatcher({type: 'QUOTE_SELECTED', payload: {quote: quote}});
				this.router.navigate(route);

		});
	}
}