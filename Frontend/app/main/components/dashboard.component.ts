import {Component, OnInit} from '@angular/core';
import {CRMDataService} from '../services/crm-data.service';
import {CRMStoreService} from '../services/crm-store.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Company} from '../models/company.model';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
	selector: 'dashboard-component',
	template: `
	<div class="row">
		<small class="pull-right">Angular Bros <strong>CRM</strong></small>
		<div class="pull-left">
			<strong [routerLink]="['/Company-Details', selectedCompany?.id]">{{selectedCompany.name || 'No Company Selected'}}</strong>
			<button class="btn btn-sm btn-default dropdown-toggle" type="button" id="companyDropDown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
				<span class="icon icon-office"></span>
				<span class="caret"></span>
			</button>
			<ul class="dropdown-menu" aria-labelledby="companyDropDown">
				<li (click)="companySelectDispatch({})">All Companies</li>
				<li *ngFor="let company of (companies$ | async)" (click)="companySelectDispatch(company)">{{company.name}}</li>
			</ul>	
		</div>
	</div>
	`
})

export class DashboardComponent implements OnInit {
	private companiesSource: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);
	public companies$: Observable<Company[]> = this.companiesSource.asObservable();
	private selectedCompanySub: Subscription;
	public selectedCompany: Company = <Company>{};
	constructor(
		private crmService: CRMDataService,
		public crmStore: CRMStoreService
	){}

	public ngOnInit(): void {
			this.selectedCompanySub = this.crmStore.crmStore$.subscribe(storeState => {
				this.selectedCompany = storeState.selectedCompany;
			});
		this.crmService.getCompanies({}).then((companies: Company[]) => {
			this.companiesSource.next(companies);
		})
	}

	public companySelectDispatch(company): void {
			this.crmStore.crmStoreDispatcher({type: 'COMPANY_SELECTED', payload: {company: company}});
	}

}