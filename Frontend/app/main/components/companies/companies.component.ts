import {Component, OnInit} from '@angular/core';
import {CRMDataService} from '../../services/crm-data.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Company} from '../../models/company.model';
import {Observable} from 'rxjs/Observable';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {CRMStore, CRMStoreService} from '../../services/crm-store.service';
import {
	trigger,
	state,
	style,
	animate,
	transition
} from '@angular/animations';
import {slideLeft} from '../../../shared/animations/transitions.animation';


@Component({
	selector: 'companies-component',
	template: `
		<div *ngIf="!dataReady">
			<data-loading-screen></data-loading-screen>
		</div>
		<div *ngIf="!!dataReady">
			<button class="btn btn-block" [routerLink]="['/Add-Company']">Add A Company</button>
			<table class="table table-bordered table-responsive table-hover">
				<tbody>
					<tr class="crm-list-item" *ngFor="let company of (companies$ | async)">
						<td class="crm-list-item-title text-center" (click)="routeWithDispatch(company, ['/Company-Details'])">{{company.name}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	`,

})
export class CompaniesComponent implements OnInit {
	public dataReady: boolean = false;
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
			.then((companies: Company[]) => {
				this.companiesSource.next(companies);
				this.dataReady = true;
			});

	}

	public routeWithDispatch(company, route): void {
		this.crmStore.crmStoreDispatcher({type: 'COMPANY_SELECTED', payload: {company: company}});
		this.router.navigate(route);
	}
}