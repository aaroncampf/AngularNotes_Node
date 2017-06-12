import {Component, OnDestroy, OnInit} from '@angular/core';
import {CRMStoreService} from '../../services/crm-store.service';
import {CRMDataService} from '../../services/crm-data.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Contact} from '../../models/contact.model';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {Company} from '../../models/company.model';
import {ToastsManager} from 'ng2-toastr';
@Component({
	selector:'contacts-component',
	template: `
		<button class="btn btn-block" [routerLink]="['/Add-Contact']">Add A Contact</button>
		<table class="table table-bordered table-justified table-hover">
			<tbody>
				<tr class="crm-list-item" *ngFor="let contact of (contacts$ | async)">
					<td class="crm-list-item-title" (click)="routeWithDispatch(contact, ['/Contact-Details'])">{{contact.name}}</td>
					<td>
						<span class="icon icon-share"(click)="routeWithDispatch(contact, ['/Quotes'])"></span>
					</td>
				</tr>
			</tbody>
		</table>
	`
})
export class ContactsComponent implements OnInit, OnDestroy{
	private contactsSource: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);
	public contacts$: Observable<Contact[]> = this.contactsSource.asObservable();
	public stateSub: Subscription;
	public companySelected: boolean = false;

	constructor(
		private router: Router,
		public toastr: ToastsManager,
		private crmStore: CRMStoreService,
		private crmData: CRMDataService
	){}

	public ngOnInit(): void {
		this.updateContacts();
	}

	public ngOnDestroy(): void {
		this.stateSub.unsubscribe();
	}

	private updateContacts(): void {
		this.stateSub = this.crmStore.crmStore$.subscribe(state => {
			if(state.selectedCompany && state.selectedCompany.id){
				this.crmData.getContacts({owner_id: state.selectedCompany.id})
					.then((contacts: Contact[]) => {
						this.contactsSource.next(contacts);
					})
			} else {
				this.crmData.getContacts({})
					.then((contacts: Contact[])=> {
						this.contactsSource.next(contacts)
					});
			}
		});
	}

	public routeWithDispatch(contact, route): void {
		this.crmData.getCompanies({id: contact.company_id})
			.then((company: Company )=> {
				this.crmStore.crmStoreDispatcher({type: 'CONTACT_SELECTED', payload: {contact: contact, company: company}});
				this.router.navigate(route);
		})
	}

	public remove(contact): void {
		this.crmData.deleteContact({id: contact.id}).then(res => {
			if(+res === 1) {
				this.toastr.warning(contact.name + ' has been removed!');
				this.updateContacts();
			} else {
				this.toastr.error('ERROR: ' + contact.name + ' could not be deleted!');
			}

		})
	}
}