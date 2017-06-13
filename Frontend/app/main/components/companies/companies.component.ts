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
		<button class="btn btn-block" [routerLink]="['/Add-Company']">Add A Company</button>
		<table class="table table-bordered table-responsive table-hover">
			<tbody>
				<tr class="crm-list-item" *ngFor="let company of (companies$ | async)">
					<td class="crm-list-item-title text-center" (click)="routeWithDispatch(company, ['/Company-Details'])">{{company.name}}</td>
				</tr>
			</tbody>
		</table>
	`,
	animations: [ trigger('flyInOut', [
		state('in', style({transform: 'translateX(0)'})),
		transition('void => *', [
			style({transform: 'translateX(-100%)'}),
			animate(1000)
		]),
		transition('* => void', [
			animate(1000, style({transform: 'translateX(100%)'}))
		])
	])]

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

	public routeWithDispatch(company, route): void {
		this.crmStore.crmStoreDispatcher({type: 'COMPANY_SELECTED', payload: {company: company}});
		this.router.navigate(route);
	}
}