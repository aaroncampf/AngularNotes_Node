import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CRMDataService} from '../../services/crm-data.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Company} from '../../models/company.model';
import {Observable} from 'rxjs/Observable';
import {FormControl, FormGroup} from '@angular/forms';
import {CRMStoreService} from '../../services/crm-store.service';
import {Subscription} from 'rxjs/Subscription';
import {ToastsManager} from 'ng2-toastr';
@Component({
	selector: 'company-details-component',
	template: `
		<h4>Company Details</h4>
		<div *ngIf="!company.id">
			<h5>Please select a company, first.</h5>
		</div>
		<div *ngIf="!!company.id">
			<form [formGroup]="companyForm">
				<single-line-text-input-component label="Name" [model]="company.name" [control]="nameControl"></single-line-text-input-component>
				<single-line-text-input-component label="Address" [model]="company.addressOne" [control]="addressOneControl"></single-line-text-input-component>
				<single-line-text-input-component label="City" [model]="company.city" [control]="cityControl"></single-line-text-input-component>
				<single-line-text-input-component label="Zip" [model]="company.zip" [control]="zipControl"></single-line-text-input-component>
				<single-line-text-input-component label="Phone" [model]="company.phone" [control]="phoneControl"></single-line-text-input-component>
				<single-line-text-input-component label="Web" [model]="company.web" [control]="webControl"></single-line-text-input-component>
				<single-line-text-input-component label="Misc" [model]="company.misc" [control]="miscControl"></single-line-text-input-component>
				<button type="button" class="btn-success btn-lg pull-right" (click)="onSave()">Save</button>
				<button type="button" class="btn-warning btn-lg pull-right" [routerLink]="['/Companies']">Cancel</button>
			</form>
		</div>
	`
})
export class CompanyDetailsComponent implements OnInit, OnDestroy {
	public company: Company = <Company>{};
	private stateSub: Subscription;
	public nameControl: FormControl = new FormControl('', []);
	public addressOneControl: FormControl = new FormControl('', []);
	public cityControl: FormControl = new FormControl('', []);
	public zipControl: FormControl = new FormControl('', []);
	public phoneControl: FormControl = new FormControl('', []);
	public webControl: FormControl = new FormControl('', []);
	public miscControl: FormControl = new FormControl('', []);
	public companyForm: FormGroup = new FormGroup({
		name: this.nameControl,
		addressOne: this.addressOneControl,
		city: this.cityControl,
		zip: this.zipControl,
		phone: this.phoneControl,
		web: this.webControl,
		misc: this.miscControl,
	});

	constructor(
		private router: Router,
		public toastr: ToastsManager,
		private crmData: CRMDataService,
		public crmStore: CRMStoreService
	){}

	public ngOnDestroy(): void {
		this.stateSub.unsubscribe()
	}

	public ngOnInit(): void {
		this.stateSub = this.crmStore.crmStore$
			.subscribe(state => {
				this.company = state.selectedCompany;
		})
	}

	public onSave(): void {
		this.crmData.setCompany({id: this.company.id, props: this.companyForm.value})
			.then(() => {
				this.toastr.success(this.company.name + ' updated!');
				this.router.navigate(['/Companies']);
		})
	}
}