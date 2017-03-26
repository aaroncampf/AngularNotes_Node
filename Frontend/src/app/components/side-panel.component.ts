import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Company} from '../models/company.model';
import {CompanyService} from '../services/companies.service';
import {ContactService} from '../services/contact.service';
import {Contact} from '../models/contact.model';

@Component({
	selector: 'side-panel',
	template: `
		<div class="row">
			<button class="btn btn-block">Add Company</button>
			<table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>Companies</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr [class.active]="currentCompany.ID === company.ID" *ngFor="let company of companies" (click)="onSelectCompany(company)">
						<td>{{company.Name}}</td>
						<td>
							<i class="glyphicon glyphicon-remove"></i>
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
					<th>Contacts</th>
				</tr>
				</thead>
				<tbody>
				<tr [class.active]="currentContact.ID === contact.ID" *ngFor="let contact of contacts" (click)="onSelectContact(contact)">
					<td>{{contact.Name}}</td>
					<td>
						<i class="glyphicon glyphicon-remove"></i>
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
	constructor(private companyService: CompanyService, private contactService: ContactService) {}

	public ngOnInit(): void{
		this.companyService.getCompanies().subscribe(companies => {
			this.companies = companies;
		});
		this.contactService.getContacts().subscribe(contacts => {
			this.contacts = contacts;
		})
	}

	public onSelectCompany(company: Company): void {
		this.currentCompany = company;
		this.currentCompanyChange.emit(company);
		this.contactService.getCompanyContacts(company.ID).subscribe(contacts => {
			this.contacts = contacts;
		})
	}

	public onSelectContact(contact: Contact): void {
		this.currentContact = contact;
		this.currentContactChange.emit(contact);
	}

	public removeContact(contactId){
		this.contactService.deleteContact(contactId).subscribe(response => {
			console.log()
		})
	}

	public removeCompany(){}

}