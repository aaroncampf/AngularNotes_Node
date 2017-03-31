import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Company} from '../models/company.model';
import {CompanyService} from '../services/companies.service';
import {DataShareService} from '../services/data-share.service';
import {ToastsManager} from 'ng2-toastr/ng2-toastr'

@Component({
	selector: 'company-details-component',
	template: `
		<div *ngIf="company.ID">
			<h4>Company Details</h4>
			<input-component (modelChange)="saveCompany($event, 'Name')" [model]="company.Name" label="Name" [control]="nameControl"></input-component>
			<input-component (modelChange)="saveCompany($event, 'Phone')" [model]="company.Phone" label="Phone" [control]="phoneControl"></input-component>
			<input-component (modelChange)="saveCompany($event, 'Address')" [model]="company.Address" label="Address" [control]="addressControl"></input-component>
			<input-component (modelChange)="saveCompany($event, 'City')" [model]="company.City" label="City" [control]="cityControl"></input-component>
			<input-component (modelChange)="saveCompany($event, 'Zip')" [model]="company.Zip" label="Zip" [control]="zipControl"></input-component>
			<quotes-component></quotes-component>
		</div>
		<div *ngIf="!company.ID">
			<h4>Please select a Company for it's details.</h4>
		</div>
	`,
})

export class CompanyDetailsComponent implements OnInit {
	public company: Company = <Company>{};
	public nameControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
	public cityControl: FormControl = new FormControl('', [Validators.maxLength(255)]);
	public addressControl: FormControl = new FormControl('', [Validators.maxLength(255)]);
	public zipControl: FormControl = new FormControl('', [Validators.maxLength(5)]);
	public phoneControl: FormControl = new FormControl('', [Validators.maxLength(14)]);
	public miscControl: FormControl = new FormControl('', [Validators.maxLength(255)]);
	public companyGroup: FormGroup = new FormGroup({
		nameControl: this.nameControl,
		addressControl: this.addressControl,
		miscControl: this.miscControl,
		cityControl: this.cityControl,
		phoneControl: this.phoneControl,
		zipControl: this.zipControl,
	});

	constructor(private companyService: CompanyService,
				private selectService: DataShareService,
				public toastr: ToastsManager){}

	public saveCompany(event: string, key: string): void {
		if (this.companyGroup.invalid){
			this.toastr.error('To save please provide a name', 'Oh no! ')
		} else {
			console.log(event, key);
			this.company[key] = event;
			this.companyService.updateCompany(this.company).subscribe(res => console.log(res));
			console.log('saving', this.company);
		}
	}

	public ngOnInit() {
		this.selectService.companySelected$.subscribe(company => {
			this.company = company;
		});
	}

}