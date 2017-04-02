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
		<button class="btn btn-block"(click)="createNewCompany()">Add Company</button>
		<div class="selection-row" [class.active]="currentCompany.ID === company.ID" [class.collapsed]="currentCompany.ID && currentCompany.ID !== company.ID" *ngFor="let company of companies">
			<div (click)="onSelectCompany(company)" class="col-xs-10" >{{company.Name}}</div>
			<i class="glyphicon glyphicon-remove pull-right col-xs-2" (click)="removeCompany(company)"></i>
		</div>
	</div>
	<div class="row">
		<button class="btn btn-block" [disabled]="!currentCompany.ID" [class.disabled]="!currentCompany.ID" (click)="createNewContact(currentCompany.ID)">Add Contact</button>
		<div class="selection-row" [class.active]="currentContact.ID === contact.ID" [class.collapsed]="currentContact.ID && currentContact.ID !== contact.ID" *ngFor="let contact of contacts">
			<div class="col-xs-10" (click)="onSelectContact(contact)">{{contact.Name}}</div>
			<i class="glyphicon glyphicon-remove col-xs-2" (click)="removeContact(contact)"></i>
		</div>
	</div>
	
	`
})

export class SidePanelComponent implements OnInit{
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
		this.companyService.getCompanies()
			.subscribe(companies => {
				this.companies = companies;
				this.companies.sort();
		});
		this.contactService.getContacts()
			.subscribe(contacts => {
				this.contacts = contacts;
				this.contacts.sort();
		})
	}

	public createNewCompany(): void {
		this.router.navigate(['/company']);
		this.companyService.createCompany()
			.subscribe(company => {
				this.toastr.success('Company Successfully Created! Please provide a name.');
				this.currentCompany = company;
				this.currentCompanyChange.emit(company);
				this.companies.push(this.currentCompany);
				this.contacts = [];
		})
	}

	public createNewContact(companyId): void {
		this.contactService.createContact(companyId)
			.subscribe(contactID => {
				this.toastr.success('Success! Please provide a name.');
				this.currentContact = <Contact>{ID: contactID._body};console.log('create current', this.currentContact);
				this.currentContactChange.emit(this.currentContact);
				let temp = this.contacts;
				this.contacts = [];
				this.contacts.push(this.currentContact);
				temp.push(this.currentContact);
				this.contacts = temp;
				this.router.navigate(['/contact'])

		})
	}

	public onSelectCompany(company: Company): void {
		if (!this.currentCompany.ID){
			this.currentCompany = company;
			this.currentCompanyChange.emit(company);
			this.contactService.getCompanyContacts(company.ID)
				.subscribe(contacts => this.contacts = contacts);
		} else {
			this.currentCompany = <Company>{};
			this.currentCompanyChange.emit(<Company>{});
			this.onSelectContact(<Contact>{});
			this.contactService.getContacts()
				.subscribe(contacts => this.contacts = contacts);
		}
	}

	public onSelectContact(contact: Contact): void{
		if (!this.currentContact.ID) {
			this.currentContact = contact;
			this.currentContactChange.emit(contact);
		} else {
			this.currentContact = <Contact>{};
			this.currentContactChange.emit(<Contact>{});
		}
	}

	public removeContact(contact: Contact): void{
			this.currentContact = <Contact>{};
			this.currentContactChange.emit(<Contact>{});
			this.contactService.deleteContact(contact.ID)
				.subscribe(() => {
					this.toastr.warning('Removed ' + contact.Name);
					this.contactService.getContacts()
						.subscribe(contacts => this.contacts = contacts)
			}, error => this.toastr.error('There Are Notes Related to ' + contact.Name + 'Please delete them first.' ));
	}

	public removeCompany(company): void{
		this.companyService.deleteCompany(company.ID)
			.subscribe(() => {
				this.toastr.warning('Removed ' + company.Name);
				this.currentCompany = <Company>{};
				this.companyService.getCompanies()
					.subscribe(companies => this.companies = companies);
		}, error => this.toastr.error('Oh no! Something went wrong with removing ' + company.Name + ' please try again later.'));
	}

}