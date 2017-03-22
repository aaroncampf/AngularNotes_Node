import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
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
				<table class="table table-striped table-bordered table-hover">
					<thead>
						<th>Name</th>
						<th>Phone</th>
						<th></th>
					</thead>
					<tbody>
						<tr *ngFor="let company of companies">
							<td (click)="companyIsSelected(company)">
								<strong>{{company?.Name}}</strong>
							</td>
							<td (click)="companyIsSelected(company)">{{company.Phone}}</td>
							<td (click)="removeCompany(company.ID)">
								<i class="glyphicon glyphicon-remove-circle"></i>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<form [formGroup]="companiesGroup" (ngSubmit)="companySave()">
			<span class="col-xs-6">
				<input-component placeholder="Name" [model]="selectedCompany.Name" [control]="nameControl"></input-component>
			</span>
			<span class="col-xs-6">
				<input-component placeholder="Phone" [model]="selectedCompany.Phone" [control]="phoneControl"></input-component>	
			</span>
			<input-component placeholder="Address" [model]="selectedCompany.Address" [control]="addressControl"></input-component>
			<span class="col-xs-6">
				<input-component placeholder="City" [model]="selectedCompany.City" [control]="cityControl"></input-component>
			</span>
			<span class="col-xs-6">
				<input-component placeholder="ZipCode" [model]="selectedCompany.Zip" [control]="zipControl"></input-component>
			</span>
			<div class="row">
				Misc: <textarea [ngModel]="selectedCompany.Misc" class="form-control" [formControl]="miscControl"></textarea>
			</div>
			<div class="row">
				<button class="btn btn-lg" type="submit" [disabled]="companiesGroup.invalid" [class.disabled]="companiesGroup.invalid">Save</button>
				<button class="btn btn-danger" type="button" (click)="removeCompany(selectedCompany.ID)">Remove</button>
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
							<th></th>
						</tr>	
					</thead>
					<tbody>
						<tr *ngFor="let contact of contacts" >
							<td>{{contact.ID}}</td> 
							<td>{{contact.Name}}</td>
							<td>{{contact.Phone}}</td>
							<td>{{contact.Email}}</td>
							<td>{{contact.Position}}</td>
							<td>
								<i class="glyphicon glyphicon-list" (click)="selectContact(contact.ID, 0)"></i>
							</td>
						</tr>	
					</tbody>
				</table>
			</div>
		</form>
		<button class="btn btn-block" (click)="selectContact(0, selectedCompany.ID)">Add A {{selectedCompany.Name}} Contact</button>
`
})

export class CompaniesComponent implements OnInit {
	@Output()
	public companySelected: EventEmitter<boolean> = new EventEmitter<boolean>();
	public selectedCompany:Company = <Company>{};
	public contacts: Contact[] = [];
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
		this.companyService.getCompanies().subscribe(companies => {
			this.companies = companies;
		});
	}

	public companyIsSelected(company: Company): void {
		this.selectedCompany = company;
		this.companySelected.emit(true);
		this.contactService.getCompanyContacts(company.ID)
			.subscribe(contacts => this.contacts = contacts, err => console.log('getCompanyContacts Error', err));
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
	public removeCompany(id: number): void {
		this.companyService.deleteCompany(id).subscribe(res => {
			console.log(res); //todo toastr
			this.companyService.getCompanies()
				.subscribe(companies => {
					this.companies = companies;
					this.selectedCompany = <Company>{};
				});
			});
	}

	public selectContact(contactId: number, companyId: number): void {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"contactId": contactId.toString(),
				"companyId": companyId.toString()
			}
		};
		this.router.navigate(['/contacts'], navigationExtras);
	}

}