import {Component, OnInit} from '@angular/core';
import {CRMService} from '../../services/crm.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Company} from '../../models/company.model';
import {Observable} from 'rxjs/Observable';
import {ToastsManager} from 'ng2-toastr';

@Component({
	selector: 'companies-component',
	template: `
		<button class="btn btn-block" [routerLink]="['/Add-Company']">Add A Company</button>
		<ul class="crm-list">
			<li class="crm-list-item" *ngFor="let company of (companies$ | async)">
				<company-icons class="crm-list-item-icons">
					<span [routerLink]="['/Contacts', company.id]" class="icon icon-user-tie"></span>
					<span [routerLink]="['/Quotes', company.id]" class="icon icon-bubble2"></span>
				</company-icons>
				<company-name class="crm-list-item-title text-center" [routerLink]="['/Company-Details', company.id]">{{company.name}}</company-name>
				<company-options-icons class="crm-list-options">
					<span class="icon icon-bin" (click)="remove(company.id)"></span>
				</company-options-icons>
			</li>
		</ul>
	`
})
export class CompaniesComponent implements OnInit {
	private companiesSource: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);
	public companies$: Observable<Company[]> = this.companiesSource.asObservable();
	constructor(
		private crmService: CRMService,
		public toastr: ToastsManager
	){}

	public ngOnInit(): void {
			this.crmService.getCompanies()
				.then(companies => this.companiesSource.next(companies));
	}

	public remove(companyID): void {
			this.toastr.warning('Company Removed!');
	}
}