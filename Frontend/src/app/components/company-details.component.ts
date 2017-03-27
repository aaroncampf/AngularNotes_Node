import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Company} from '../models/company.model';
import {CompanyService} from '../services/companies.service';
import {DataShareService} from '../services/data-share.service';
import {Subscription} from 'rxjs';

@Component({
	selector: 'company-details-component',
	template: `
	<h4>Company Details</h4>
	<input-component (modelChange)="saveCompany($event, 'Name')" [model]="company.Name" label="Name" [control]="nameControl"></input-component>
	<input-component (modelChange)="saveCompany($event, 'Phone')" [model]="company.Phone" label="Phone" [control]="phoneControl"></input-component>
	<input-component (modelChange)="saveCompany($event, 'Address')" [model]="company.Address" label="Address" [control]="addressControl"></input-component>
	<input-component (modelChange)="saveCompany($event, 'City')" [model]="company.City" label="City" [control]="cityControl"></input-component>
	<input-component (modelChange)="saveCompany($event, 'Zip')" [model]="company.Zip" label="Zip" [control]="zipControl"></input-component>
	`,
})

export class CompanyDetailsComponent implements OnInit {
	public company: Company = <Company>{};
	public nameControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
	public cityControl: FormControl = new FormControl('', []);
	public addressControl: FormControl = new FormControl('', []);
	public zipControl: FormControl = new FormControl('', []);
	public phoneControl: FormControl = new FormControl('', []);
	public miscControl: FormControl = new FormControl('', []);
	public companyGroup: FormGroup = new FormGroup({
		nameControl: this.nameControl,
		addressControl: this.addressControl,
		miscControl: this.miscControl,
		cityControl: this.cityControl,
		phoneControl: this.phoneControl,
		zipControl: this.zipControl,
	});
	public subscription: Subscription;

	constructor(private companyService: CompanyService,
				private selectService: DataShareService){}

	public saveCompany(event: string, key: string): void {
		console.log(event, key);
		this.company[key] = event;
		this.companyService.updateCompany(this.company).subscribe(res => console.log(res));
		console.log('saving', this.company);
	}

	public ngOnInit() {
		this.selectService.companySelected$.subscribe(company => {
			this.company = company;
		});
	}

}