import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CRMStoreService} from '../../services/crm-store.service';
import {CRMDataService} from '../../services/crm-data.service';
import {ToastsManager} from 'ng2-toastr';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Quote} from '../../models/quote.model';
import {Subscription} from 'rxjs/Subscription';
import * as _ from 'lodash';
import {Contact} from '../../models/contact.model';

@Component({
	selector: 'quotes-component',
	template: `
		<button class="btn btn-block" [routerLink]="['/Add-Quote']">Create A Quote</button>
		<ul class="crm-list">
			<li class="crm-list-item" *ngFor="let quote of (quotes$ | async)">
				<quote-icons class="crm-list-item-icons">
					<button class="btn btn-sm btn-default dropdown-toggle" type="button" id="contactDropDown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
						<span class="icon icon-share"></span>
					</button>
					<ul class="dropdown-menu contact" aria-labelledby="contactDropDown">
						Share With:
						<li *ngFor="let contact of quote.contacts" (click)="routeWithContactDispatch(contact, quote, ['/Quote-Template'])"><strong>{{contact.name}}</strong></li>
					</ul>
					
				</quote-icons>
				<quote-name class="crm-list-item-title" (click)="routeWithDispatch(quote, ['/Quote'])">{{quote.name}}
				</quote-name>
			</li>
		</ul>
	`
})
export class QuotesComponent implements OnInit, OnDestroy {
	private quotesSource: BehaviorSubject<Quote[]> = new BehaviorSubject<Quote[]>([]);
	public quotes$: Observable<Quote[]> = this.quotesSource.asObservable();
	private stateSub: Subscription;
	constructor(
		private router: Router,
		public toastr: ToastsManager,
		public crmStore: CRMStoreService,
		public crmData: CRMDataService
	){}

	public async TestAsync(quote): Promise<string> {
		let val = await quote + ' it worked with Async!';
		console.log('stuff!!');
		console.log('stuff!!');
		console.log('stuff!!');
		let val2 = await quote + 'It Worked again!';
		return val;
	}

	public TestPromise(quote): Promise<string> {
		return new Promise((resolve) => {
			Promise.resolve().then(() => {
				console.log('this resolves first');
			});
			resolve(quote + ' it worked with new Promise!' )
		})
	}

	public ngOnInit(): void {
		//
		// let asyncThing = this.TestAsync('Holy Crap!');
		// asyncThing.then(res => this.toastr.success(res));
		//
		// let promiseThing = this.TestPromise('Holy Crap!');
		// promiseThing.then(res => this.toastr.warning(res));
		//

		this.stateSub = this.crmStore.crmStore$.subscribe(state => {
			this.quotesSource.next([]);
			if(state.selectedCompany && state.selectedCompany.id){
				this.crmData.getQuotes({owner_id: state.selectedCompany.id})
					.then((quotes: Quote[] )=> {
						for (let quote of quotes){
							this.crmData.getContacts({owner_id: quote.company_id})
								.then(contacts => {
									_.merge(quote, {contacts: contacts});
									const updatedQuotes = _.concat(this.quotesSource.getValue(), quote);
									this.quotesSource.next(updatedQuotes);
							});
						}
					})
			} else {
				this.crmData.getQuotes({})
					.then((quotes: Quote[]) => {
						for (let quote of quotes){
							this.crmData.getContacts({owner_id: quote.company_id})
								.then(contacts => {
									_.merge(quote, {contacts: contacts});
									const updatedQuotes = _.concat(this.quotesSource.getValue(), quote);
									this.quotesSource.next(updatedQuotes);
									console.log('quoteSource', this.quotesSource.getValue());
								});
						}
				});
			}
		});
	}

	public ngOnDestroy(){
		this.stateSub.unsubscribe();
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