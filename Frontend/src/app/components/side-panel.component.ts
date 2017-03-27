import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Company} from '../models/company.model';
import {CompanyService} from '../services/companies.service';
import {ContactService} from '../services/contact.service';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {Contact} from '../models/contact.model';
import {error} from 'util';
import {Router} from '@angular/router';

@Component({
	selector: 'side-panel',
	template: `
		<div class="row">
			<button class="btn btn-block">Add Company</button>
			<table class="table table-bordered table-hover drop-down">
				<thead>
					<tr>
						<th>Companies</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr [class.active]="currentCompany.ID === company.ID" *ngFor="let company of companies">
						<td (click)="onSelectCompany(company)">{{company.Name}}</td>
						<td>
							<i class="glyphicon glyphicon-remove" (click)="removeCompany(company)"></i>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="row">
			<button class="btn btn-block">Add Contact</button>
			<table class="table table-bordered table-hover">
				<thead>
				<tr>
					<th>Contacts</th>
					<th></th>
				</tr>
				</thead>
				<tbody>
				<tr [class.active]="currentContact.ID === contact.ID" *ngFor="let contact of contacts">
					<td (click)="onSelectContact(contact)">{{contact.Name}}</td>
					<td>
						<i class="glyphicon glyphicon-remove" (click)="removeContact(contact)"></i>
					</td>
				</tr>
				</tbody>
			</table>
		</div>
	`
})

export class SidePanelCompoennt implements OnInit{
	public companies: Company[];
	public contacts: Contact[];
	public currentContact: Contact = <Contact>{};
	public currentCompany: Company = <Company>{};
	@Output()
	public currentContactChange: EventEmitter<Contact> = new EventEmitter<Contact>();
	@Output()
	public currentCompanyChange: EventEmitter<Company> = new EventEmitter<Company>();
	constructor(public toastr: ToastsManager,
				private companyService: CompanyService,
				private contactService: ContactService,
				private router: Router) {}

	public ngOnInit(): void{
		this.companyService.getCompanies().subscribe(companies => {
			this.companies = companies;
		});
		this.contactService.getContacts().subscribe(contacts => {
			this.contacts = contacts;
		})
	}

	public onSelectCompany(company: Company): void {
		this.router.navigate(['/company']).then(() => {
			this.currentCompany = company;
			this.currentCompanyChange.emit(company);
			this.contactService.getCompanyContacts(company.ID).subscribe(contacts => {
				this.contacts = contacts;
			})
		})
	}

	public onSelectContact(contact: Contact): void{
		this.router.navigate(['/contact']).then(() => {
			this.currentContact = contact;
			this.currentContactChange.emit(contact);
		});
	}

	public removeContact(contact: Contact): void{
		this.contactService.deleteContact(contact.ID).subscribe(() => {
			this.toastr.warning('Removed ' + contact.Name);
			this.contactService.getCompanyContacts(contact.Company.ID).subscribe(contacts => {
				this.contacts = contacts;
			})
		}, error => this.toastr.error('Oh no! Something went wrong with removing ' + contact.Name + ' please try again later.'));
	}

	public removeCompany(company): void{
		this.companyService.deleteCompany(company.ID).subscribe(() => {
			this.toastr.warning('Removed ' + company.Name);
			this.companyService.getCompanies().subscribe(companies => {
				this.companies = companies;
			})
		}, error => this.toastr.error('Oh no! Something went wrong with removing ' + company.Name + ' please try again later.'));
	}

}