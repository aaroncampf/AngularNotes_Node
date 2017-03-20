import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {Company} from '../models/company.model';
import {CompanyService} from '../services/companies.service';
@Component({
	selector: 'companies-component',
	template: `
		<div class="col-xs-12">
			<select [(ngModel)]="selectedCompany" class="form-control" placeholder="Select a Company">
				<option (click)="companyIsSelected()" *ngFor="let company of companies" [ngValue]="company">{{company.Name}}</option>
				<option [ngValue]="newCompany">New Company...</option>
			</select>
		<div class="col-xs-12">Company ID: {{selectedCompany.ID}}</div>
		</div>
		<form [formGroup]="companiesGroup" (ngSubmit)="companySave()">
			<input-component label="Name" [(model)]="selectedCompany.Name" [control]="nameControl"></input-component>
			<input-component label="Address" [(model)]="selectedCompany.Address" [control]="addressControl"></input-component>
			<input-component label="City" [(model)]="selectedCompany.City" [control]="cityControl"></input-component>
			<input-component label="ZipCode" [(model)]="selectedCompany.Zip" [control]="zipControl"></input-component>
			<input-component label="Phone" [(model)]="selectedCompany.Phone" [control]="phoneControl"></input-component>
			<div class="row">
				Misc: <textarea [(ngModel)]="selectedCompany.Misc" class="form-control" [formControl]="miscControl"></textarea>
			</div>
			<div class="row">
				 <table class="table table-bordered table-hover">
					<thead>
						<tr>
							<th>Contacts</th>
						</tr>	
					</thead>
					<tbody>
						<tr>
							<td>Contact 2</td> 	
						</tr>	
						<tr>
							<td>Contact 1</td> 	
						</tr>
						<tr>
							<td>Contact 3</td> 	
						</tr>	
					</tbody>
				</table>
			</div>
			<button class="btn btn-lg" type="submit" [disabled]="companiesGroup.invalid" [class.disabled]="companiesGroup.invalid">Save</button>
			<button class="btn btn-lg" type="button" (click)="removeCompany()">Remove</button>
		</form>
`
})

export class CompaniesComponent implements OnInit{
	@Input()
	public companySelected: boolean;
	@Output()
	public changeCompanySelected: EventEmitter<boolean> = new EventEmitter<boolean>();
	public selectedCompany:Company = <Company>{};
	public newCompany: Company = <Company>{
		ID: void 0
	};
	public companies: Company[];
	public nameControl: FormControl = new FormControl('', [Validators.maxLength(255)]);
	public addressControl: FormControl = new FormControl('', []);
	public cityControl: FormControl = new FormControl('', []);
	public zipControl: FormControl = new FormControl('', []);
	public phoneControl: FormControl = new FormControl('', []);
	public miscControl: FormControl = new FormControl('', []);
	public companiesGroup: FormGroup = new FormGroup({
		nameControl: this.nameControl,
		addressControl: this.addressControl,
		miscControl: this.miscControl,
		cityControl: this.cityControl,
		zipControl: this.zipControl,
		phoneControl: this.phoneControl,
	});
	constructor(private companyService: CompanyService){};

	public ngOnInit(): void {
		this.companyService.getCompanies()
			.subscribe(companies => this.companies = companies);
	}

	public companyIsSelected(): void {
		this.companySelected = true;
	}

	public companySave(): void {
		this.companyService.saveCompany(this.companiesGroup.value, this.selectedCompany.ID)
			.subscribe(res => {
				console.log(res); //todo toastr
				this.companyService.getCompanies()
					.subscribe(companies => this.companies = companies);
			});
	}
	public removeCompany(): void {
		this.companyService.deleteCompany(this.selectedCompany.ID).subscribe(res => {
			console.log(res); //todo toastr
			this.companyService.getCompanies()
				.subscribe(companies => {
					this.companies = companies;
					this.selectedCompany = <Company>{};
				});
			});
	}

}