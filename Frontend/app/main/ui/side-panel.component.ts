// import {Component, EventEmitter, OnInit, Output} from '@angular/core';
// import {Company} from '../companies/company.model';
// import {ContactsService} from '../contacts/contacts.service';
// import {ToastsManager} from 'ng2-toastr/ng2-toastr';
// import {Contact} from '../contacts/contact.model';
// import {Router} from '@angular/router';
//
// @Component({
// 	selector: 'side-panel',
// 	template: `
// 	<div class="row">
// 		<button class="btn btn-block"(click)="createNewCompany()">Add Company</button>
// 		<div class="selection-row" [class.active]="currentCompany.id === company.id" [class.collapsed]="currentCompany.id && currentCompany.id !== company.id" *ngFor="let company of companies">
// 			<div (click)="onSelectCompany(company)" class="col-xs-10" >{{company.name}}</div>
// 			<i class="glyphicon glyphicon-remove pull-right col-xs-2" (click)="removeCompany(company)"></i>
// 		</div>
// 	</div>
// 	<div class="row">
// 		<button class="btn btn-block" [disabled]="!currentCompany.id" [class.disabled]="!currentCompany.id" (click)="createNewContact(currentCompany.id)">Add Contact</button>
// 		<div class="selection-row" [class.active]="currentContact.id === contact.id" [class.collapsed]="currentContact.id && currentContact.id !== contact.id" *ngFor="let contact of contacts">
// 			<div class="col-xs-10" (click)="onSelectContact(contact)">{{contact.name}}</div>
// 			<i class="glyphicon glyphicon-remove col-xs-2" (click)="removeContact(contact)"></i>
// 		</div>
// 	</div>
//
// 	`
// })
//
// export class SidePanelComponent implements OnInit{
// 	public companies: Company[];
// 	public contacts: Contact[];
// 	public currentContact: Contact = <Contact>{};
// 	public currentCompany: Company = <Company>{};
// 	@Output()
// 	public currentContactChange: EventEmitter<Contact> = new EventEmitter<Contact>();
// 	@Output()
// 	public currentCompanyChange: EventEmitter<Company> = new EventEmitter<Company>();
// 	constructor(public toastr: ToastsManager,
// 				private router: Router,
// 				private companyService: CompanyService,
// 				private contactService: ContactsService) {}
//
// 	public ngOnInit(): void{
// 		this.companyService.getCompanies()
// 			.subscribe(companies => {
// 				this.items = items;
// 				this.companies.sort();
// 		});
// 		this.contactService.getContacts()
// 			.subscribe(contacts => {
// 				this.contacts = contacts;
// 				this.contacts.sort();
// 		})
// 	}
//
// 	public createNewCompany(): void {
// 		this.router.navigate(['/company']);
// 		this.companyService.createCompany()
// 			.subscribe(company => {
// 				this.toastr.success('Company Successfully Created! Please provide a name.');
// 				this.currentCompany = company;
// 				this.currentCompanyChange.emit(company);
// 				this.companies.push(this.currentCompany);
// 				this.contacts = [];
// 		})
// 	}
//
// 	public createNewContact(companyId): void {
// 		this.contactService.createContact(companyId)
// 			.subscribe(contactid => {
// 				this.toastr.success('Success! Please provide a name.');
// 				this.currentContact = <Contact>{id: contactid._body};
// 				this.currentContactChange.emit(this.currentContact);
// 				let temp = this.contacts;
// 				this.contacts = [];
// 				this.contacts.push(this.currentContact);
// 				temp.push(this.currentContact);
// 				this.contacts = temp;
// 				this.router.navigate(['/contact'])
// 		})
// 	}
//
// 	public onSelectCompany(company: Company): void {
// 		if (!this.currentCompany.id){
// 			this.currentCompany = company;
// 			this.currentCompanyChange.emit(company);
// 			this.contactService.getCompanyContacts(company.id)
// 				.subscribe(contacts => this.contacts = contacts);
// 		} else {
// 			this.currentCompany = <Company>{};
// 			this.currentCompanyChange.emit(<Company>{});
// 			this.onSelectContact(<Contact>{});
// 			this.contactService.getContacts()
// 				.subscribe(contacts => this.contacts = contacts);
// 		}
// 	}
//
// 	public onSelectContact(contact: Contact): void{
// 		if (!this.currentContact.id) {
// 			this.currentContact = contact;
// 			this.currentContactChange.emit(contact);
// 		} else {
// 			this.currentContact = <Contact>{};
// 			this.currentContactChange.emit(<Contact>{});
// 		}
// 	}
//
// 	public removeContact(contact: Contact): void{
// 			this.currentContact = <Contact>{};
// 			this.currentContactChange.emit(<Contact>{});
// 			this.contactService.deleteContact(+contact.id)
// 				.subscribe(() => {
// 					this.toastr.warning('Removed ' + contact.name);
// 					this.contactService.getContacts()
// 						.subscribe(contacts => this.contacts = contacts)
// 			}, error => this.toastr.error('There Are Notes Related to ' + contact.name + 'Please delete them first.' ));
// 	}
//
// 	public removeCompany(company): void{
// 		this.companyService.deleteCompany(company.id)
// 			.subscribe(() => {
// 				this.toastr.warning('Removed ' + company.name);
// 				this.currentCompany = <Company>{};
// 				this.companyService.getCompanies()
// 					.subscribe(items => this.items = items);
// 		}, error => this.toastr.error('Oh no! Something went wrong with removing ' + company.name + ' please try again later.'));
// 	}
//
// }