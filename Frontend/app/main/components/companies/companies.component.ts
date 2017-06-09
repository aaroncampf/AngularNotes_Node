import {Component, OnInit} from '@angular/core';
import {CRMDataService} from '../../services/crm-data.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Company} from '../../models/company.model';
import {Observable} from 'rxjs/Observable';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {CRMStore, CRMStoreService} from '../../services/crm-store.service';

@Component({
	selector: 'companies-component',
	template: `
		<button class="btn btn-block" [routerLink]="['/Add-Company']">Add A Company</button>
		<ul class="crm-list">
			<li class="crm-list-item" *ngFor="let company of (companies$ | async)">
				<company-icons class="crm-list-item-icons">
					<span (click)="routeWithDispatch(company, ['/Contacts'])" class="icon icon-user-tie"></span>
					<span (click)="routeWithDispatch(company, ['/Quotes'])" class="icon icon-bubble2"></span>
				</company-icons>
				<company-name class="crm-list-item-title text-center" (click)="routeWithDispatch(company, ['/Company-Details'])">{{company.name}}</company-name>
				<company-options-icons class="crm-list-options">
					<span class="icon icon-bin" (click)="remove(company)"></span>
				</company-options-icons>
			</li>
		</ul>
	`
})
export class CompaniesComponent implements OnInit {
	private companiesSource: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);
	public companies$: Observable<Company[]> = this.companiesSource.asObservable();
	constructor(
		private router: Router,
		private crmService: CRMDataService,
		private crmStore: CRMStoreService,
		public toastr: ToastsManager
	){}

	public ngOnInit(): void {
		this.updateCompanies();
	}

	private updateCompanies(): void {
		this.crmService.getCompanies({})
			.then((companies: Company[] )=> this.companiesSource.next(companies));

	}

	public remove(company): void {
		this.crmService.deleteCompany({id: company.id}).then(res => {
			if (+res === 1){
				this.toastr.warning(company.name + ' has been removed!');
				this.updateCompanies();
			} else {
				this.toastr.error('ERROR: ' + company.name  + ' could not be deleted!')
			}
		});
	}

	public routeWithDispatch(company, route): void {
		this.crmStore.crmStoreDispatcher({type: 'COMPANY_SELECTED', payload: {company: company}});
		this.router.navigate(route);
	}
}