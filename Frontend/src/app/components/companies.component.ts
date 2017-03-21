import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {Company} from '../models/company.model';
import {CompanyService} from '../services/companies.service';
import {Contact} from '../models/contact.model';
import {ContactService} from '../services/contact.service';
import {Router, NavigationExtras} from '@angular/router';
@Component({
	selector: 'companies-component',
	template: `
		<div class="row">
			<div class="col-xs-12">
				<strong>Select a Company:</strong>
				<select [(ngModel)]="selectedCompany" class="form-control">
					<option (click)="companyIsSelected()" *ngFor="let company of companies" [ngValue]="company">{{company.Name}}</option>
					<option [ngValue]="newCompany">New Company...</option>
				</select>
			</div>
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
				<button class="btn btn-lg" type="submit" [disabled]="companiesGroup.invalid" [class.disabled]="companiesGroup.invalid">Save</button>
				<button class="btn btn-danger" type="button" (click)="removeCompany()">Remove</button>
			</div>
			<h4>{{selectedCompany.Name}} Contacts</h4>
			<div class="row">
				 <table class="table table-bordered table-hover">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Phone</th>
							<th>Email</th>
							<th>Position</th>
						</tr>	
					</thead>
					<tbody>
						<tr *ngFor="let contact of contacts" (click)="selectContact(contact.ID)" >
							<td>{{contact.ID}}</td> 
							<td>{{contact.Name}}</td>
							<td>{{contact.Phone}}</td>
							<td>{{contact.Email}}</td>
							<td>{{contact.Position}}</td>
							<i class="glyphicon glyphicon-remove"></i>

						</tr>	
					</tbody>
				</table>
			</div>
		</form>
		<button class="btn btn-block">Add A {{selectedCompany.Name}} Contact</button>
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
	public contacts: any[] = [];
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
	constructor(private contactService: ContactService, private companyService: CompanyService, private router: Router){};

	public ngOnInit(): void {
		this.companyService.getCompanies()
			.subscribe(companies => {
				this.companies = companies;
				this.contactService.getContacts()
					.subscribe(res => {
					this.contacts = res;
				}, err => console.log(err));
			});
	}

	public companyIsSelected(): void {
		this.companySelected = true;
	}

	public companySave(): void {
		this.companyService.saveCompany(this.companiesGroup.value, this.selectedCompany.ID)
			.subscribe(res => {
				console.log(res); //todo toastr
				this.companyService.getCompanies()
					.subscribe(companies => {
						this.companies = companies;
						this.selectedCompany = companies;
					});
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

	public selectContact(contactId: number): void {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"contactId": contactId.toString()
			}
		};
		this.router.navigate(['/contacts'], navigationExtras);
	}

}