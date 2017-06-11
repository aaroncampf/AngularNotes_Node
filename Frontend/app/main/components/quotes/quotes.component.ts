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

	public async TestAsync(quote) {
		let val = await quote + ' it worked!';
		return val;
	}

	public ngOnInit(): void {

		//It still has a .then,
		// let val = await  this.TestAsync('Holy Crap!');
		// console.log('val', val);
		// 	.then(res => {
		// 		this.toastr.success(res);
		// 		for (let i = 0; i < 3; i++){
		// 			this.TestAsync('Tick' + i)
		// 				.then( resTwo => {
		// 					// hacky stuff
		// 					this.toastr.success(resTwo);
		// 			})
		// 		}
		// });



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