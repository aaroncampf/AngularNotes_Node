import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Company, CompanyFormData} from '../models/company.model';
import {CompanyService} from '../services/companies.service';
import {Contact} from '../models/contact.model';
import {ContactService} from '../services/contact.service';
import {Router, NavigationExtras, ActivatedRoute} from '@angular/router';
@Component({
	selector: 'companies-component',
	template: `
	<div class="row">
		<div class="col-xs-12">
			<button class="btn btn-block" [routerLink]="['/create-company']">Add Company</button>
			<strong>Select a Company:</strong>
			<table class="table table-bordered table-hover">
				<thead>
				<th>Name</th>
					<th>Phone</th>
					<th>Address</th>
					<th>City</th>
					<th>ZipCode</th>
					<th></th>
				</thead>
				<tbody>
				<tr (click)="companyIsSelected(company)" *ngFor="let company of companies" [class.active]="selectedCompany.ID === company.ID">
						<td>
							<strong>{{company.Name}}</strong>
						</td>
						<td>{{company.Phone}}</td>
						<td>{{company.Address}}</td>
						<td>{{company.City}}</td>
						<td>{{company.Zip}}</td>
						<td>
							<i class="glyphicon glyphicon-edit" [routerLink]="['/edit-company',  company.ID]"></i>
						</td>
						<td>
							<i class="glyphicon glyphicon-remove-circle" (click)="removeCompany(company.ID)"></i>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="row">
		<div *ngIf="!!selectedCompany"><h4>{{selectedCompany.Name || 'Select A Company First'}}<span *ngIf="companySelected">'s Contacts</span></h4></div>
		<button class="btn btn-block" [routerLink]="['/create-contact/', selectedCompany.ID]" [disabled]="!companySelected" [class.disabled]="!companySelected">Add A {{selectedCompany.Name}} Contact</button>
		<table class="table table-bordered table-hover">
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Phone</th>
					<th>Email</th>
					<th>Position</th>
					<th></th>
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
						<i class="glyphicon glyphicon-edit" [routerLink]="['/edit-contact', contact.ID]"></i>
					</td>
					<td>
						<i class="glyphicon glyphicon-remove-circle" (click)="removeContact(contact.ID)"></i>
					</td>
				</tr>
			</tbody>
		 </table>
	</div>
	`
	})

export class CompaniesComponent implements OnInit {
	@Output()
	public currentCompany: EventEmitter<Company> = new EventEmitter<Company>();
	public newCompany: Company = <Company>{};
	public selectedCompany: Company = <Company>{};
	public companySelected: boolean = false;
	public contacts: Contact[] = [];
	public companies: Company[];

	constructor(private contactService: ContactService, private companyService: CompanyService, private router: Router, private route: ActivatedRoute){};

	public ngOnInit(): void {
		console.log('init hit');
		this.route.params.subscribe(params => {
			this.companyService.getCompanies().subscribe(companies => {
				this.companies = companies;
				if(params['id'] !== 'main') {
					for(let company of this.companies) {
						if (+params['id'] === company.ID) {
							this.companyIsSelected(company);
						}
					}
				}
			});
		});
	}

	public companyIsSelected(company: Company): void {
		console.log('isSelected',company);
		this.selectedCompany = company;
		this.companySelected = true;
		this.currentCompany.emit(company);
		this.contactService.getCompanyContacts(company.ID)
			.subscribe(contacts => this.contacts = contacts, err => console.log('getCompanyContacts Error', err));
	}

	public setNewCompany(): void {
		this.companySave(this.newCompany);
	}

	public companySave(formData: CompanyFormData): void {
		const company = {
			ID: void 0,
			Name: formData.nameControl,
			Address: formData.addressControl,
			Phone: formData.phoneControl,
			City: formData.cityControl,
			Zip: formData.zipControl,
			Misc: formData.miscControl
		};
		this.companyService.saveCompany(company, this.selectedCompany.ID).subscribe(response => {
			console.log('saveCompany response', response); //todo toastr
			this.selectedCompany = response;
				this.companyService.getCompanies().subscribe(companies => {
					this.companies = companies;
				});
		});
	}

	public removeCompany(id: number): void {
		this.companyService.deleteCompany(id).subscribe(res => {
			console.log(res); //todo toastr
			this.companyService.getCompanies().subscribe(companies => {
					this.companies = companies;
					this.selectedCompany = <Company>{};
				});
			});
	}

	public removeContact(id: number): void {
		this.contactService.deleteContact(id).subscribe(response => {
			console.log('contact removed', response);
			this.contactService.getCompanyContacts(this.selectedCompany.ID).subscribe(contacts => {
				this.contacts = contacts;
			})
		});
	}

	public selectContact(contactId: number): void {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"contactId": contactId.toString(),
			}
		};
		this.router.navigate(['/contacts'], navigationExtras);
	}

}