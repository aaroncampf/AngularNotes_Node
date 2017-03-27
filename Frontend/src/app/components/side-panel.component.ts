import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Company} from '../models/company.model';
import {CompanyService} from '../services/companies.service';
import {ContactService} from '../services/contact.service';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {Contact} from '../models/contact.model';
import {Router} from '@angular/router';

@Component({
	selector: 'side-panel',
	template: `
		<div class="row">
			<button class="btn btn-block"(click)="createNewContact()">Add Company</button>
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
			<button class="btn btn-block" [disabled]="!currentCompany.ID" [class.disabled]="!currentCompany.ID" (click)="createNewContact(currentCompany.ID)">Add Contact</button>
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
				private router: Router,
				private companyService: CompanyService,
				private contactService: ContactService) {}

	public ngOnInit(): void{
		this.companyService.getCompanies().subscribe(companies => {
			this.companies = companies;
		});
		this.contactService.getContacts().subscribe(contacts => {
			this.contacts = contacts;
		})
	}

	public createNewContact(companyId): void {
		this.contactService.saveNewContact(companyId).subscribe(response => {
			console.log('created', response._body);
			this.toastr.success('Please provide a name for your new contact', 'Contact Created!');
			this.router.navigate(['/contact']);
			console.log('current', this.currentContact);
			this.currentContact = <Contact>{};
			this.onSelectContact(<Contact>{ID: response._body});
		},() => this.toastr.error('Could not create Contact', 'Uh-oh!'));
	}

	public onSelectCompany(company: Company): void {
		if (this.currentCompany.ID) {
			this.currentCompany = <Company>{};
			this.currentCompanyChange.emit(<Company>{});
			this.companyService.getCompanies().subscribe(companies => this.companies = companies);
			this.currentContact = <Contact>{};
			this.currentCompanyChange.emit(<Company>{});
			this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);
		} else {
			this.router.navigate(['/company']);
			this.currentContact = <Contact>{};
			this.currentContactChange.emit(<Contact>{});
			this.currentCompany = company;
			this.currentCompanyChange.emit(company);
			this.contactService.getCompanyContacts(company.ID).subscribe(contacts => this.contacts = contacts);
			this.collapseCompany()
		}
	}

	public onSelectContact(contact: Contact): void{
		if (this.currentContact.ID) {
			this.router.navigate(['/company']);
			this.currentContact = <Contact>{};
			this.currentContactChange.emit(<Contact>{});
			if (this.currentCompany.ID){
				this.contactService.getCompanyContacts(this.currentCompany.ID).subscribe(contacts => this.contacts = contacts);
			} else {
				this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);
			}
		} else {
			this.router.navigate(['/contact']);
			this.currentContact = contact;
			this.currentContactChange.emit(contact);
			this.collapseContacts()
		}
	}

	public collapseContacts(): void {
		this.contacts = [];
		this.contacts.push(this.currentContact);
	}

	public collapseCompany(): void {
		this.companies = [];
		this.companies.push(this.currentCompany);
	}

	public removeContact(contact: Contact): void{
		if (!this.currentContact.ID){
			this.onSelectContact(contact);
		}
		this.contactService.deleteContact(contact.ID).subscribe(() => {
			this.toastr.warning('Removed ' + contact.Name);
			this.onSelectContact(contact);
			// this.contactService.getCompanyContacts(contact.Company.ID).subscribe(contacts => {
			// 	this.contacts = contacts;
			// })
		}, error => this.toastr.error('There Are Notes Related to ' + contact.Name + 'Please delete them first.' ));
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