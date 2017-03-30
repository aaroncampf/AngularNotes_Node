import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Company} from '../models/company.model';
import {CompanyService} from '../services/companies.service';
import {ContactService} from '../services/contact.service';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {Contact} from '../models/contact.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
	selector: 'side-panel',
	template: `
		<div class="row">
			<button class="btn btn-block"(click)="createNewCompany()">Add Company</button>
			<div class="col-xs-12">
<<<<<<< HEAD
			<h6>Company Select</h6>
			</div>
			<div class="selection-row" [class.active]="currentCompany.ID === company.ID" [class.collapsed]="currentCompany.ID && currentCompany.ID !== company.ID" *ngFor="let company of companies">
				<div (click)="onSelectCompany(company)" class="col-xs-10" >{{company.Name}}</div>
				<i class="glyphicon glyphicon-remove pull-right col-xs-2" (click)="removeCompany(company)"></i>
=======
					<th>Companies</th>
			</div>
			<div class="col-xs-12 selection-row" [class.active]="currentCompany.ID === company.ID" [class.collapsed]="currentCompany.ID && currentCompany.ID !== company.ID" *ngFor="let company of companies" (click)="onSelectCompany(company)">
				<div class="col-xs-10 pull-left">{{company.Name}}</div>
				<div class="col-xs-2 text-right">
					<i class="glyphicon glyphicon-remove" (click)="removeCompany(company)"></i>
				</div>
>>>>>>> f31a7a8ca76dace43d9f7400a60bcbc38916d4e2
			</div>
		</div>
		<div class="row">
		<button class="btn btn-block" [disabled]="!currentCompany.ID" [class.disabled]="!currentCompany.ID" (click)="createNewContact(currentCompany.ID)">Add Contact</button>
			<div class="col-xs-12">
<<<<<<< HEAD
				<h6>Contact Select</h6>
			</div>
			<div class="selection-row" [class.active]="currentContact.ID === contact.ID" [class.collapsed]="currentContact.ID && currentContact.ID !== contact.ID" *ngFor="let contact of contacts">
				<div class="col-xs-10" (click)="onSelectContact(contact)">{{contact.Name}}</div>
				<i class="glyphicon glyphicon-remove col-xs-2" (click)="removeContact(contact)"></i>
=======
				<h6>Contacts</h6>
			</div>
			<div class="selection-row" [class.active]="currentContact.ID === contact.ID" [class.collapsed]="currentContact.ID && currentContact.ID !== contact.ID" *ngFor="let contact of contacts">
				<div class="col-xs-10" (click)="onSelectContact(contact)">{{contact.Name}}</div>
				<div class="col-xs-2">
					<i class="glyphicon glyphicon-remove" (click)="removeContact(contact)"></i>
				</div>
>>>>>>> f31a7a8ca76dace43d9f7400a60bcbc38916d4e2
			</div>
		</div>
		
	`
})

export class SidePanelComponent implements OnInit{
	public companies: Company[];
	public contacts: Contact[];
	public currentContact: Contact = <Contact>{};
	public currentCompany: Company = <Company>{};
	@Input()
	public currentTab: string;
	@Output()
	public currentTabChange: EventEmitter<string> = new EventEmitter<string>();
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

	public createNewCompany(): void {
		this.companyService.createCompany().subscribe(company => {
			this.companyService.getCompanies().subscribe(companies => {
				this.companies = companies
				console.log('create response', company);
				this.toastr.success('Please provide a name for your new company.', 'Company Created!');
				this.currentCompany = <Company>{};
				this.currentCompanyChange.emit(<Company>{});
				console.log(company);
				this.router.navigate(['/company']);
				this.onSelectCompany(<Company>{ID: company.ID})
			});
		})
	}

	public createNewContact(companyId): void {
		this.contactService.saveNewContact(companyId).subscribe(response => {
			this.toastr.success('Please provide a name for your new contact.', 'Contact Created!');
			this.router.navigate(['/contact']);
			this.currentContact = <Contact>{};
			this.onSelectContact(<Contact>{ID: response._body});
		},() => this.toastr.error('Could not create Contact', 'Uh-oh!'));
	}

	public onSelectCompany(company: Company): void {
		if (this.currentCompany.ID) {
			this.currentCompany = <Company>{};
			this.currentCompanyChange.emit(<Company>{});
			// this.companyService.getCompanies().subscribe(companies => this.companies = companies);
			this.currentContact = <Contact>{};
			this.currentContactChange.emit(<Contact>{});
			this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);
		} else {
			console.log(this.currentTab);
			if(this.currentTab === 'contact' || this.currentTab === 'notes') {
				this.router.navigate(['/company']);
				this.currentTabChange.emit('company');
			}
			this.currentCompany = company;
			this.currentCompanyChange.emit(company);
			this.currentContact = <Contact>{};
			this.currentContactChange.emit(<Contact>{});
			this.contactService.getCompanyContacts(company.ID).subscribe(contacts => this.contacts = contacts);
		}
	}

	public onSelectContact(contact: Contact): void{
		if (this.currentContact.ID) {
			if (this.currentTab === 'contact') {
				this.router.navigate(['/company']);
				this.currentTabChange.emit('company');
			}
			this.currentContact = <Contact>{};
			this.currentContactChange.emit(<Contact>{});
			// if (this.currentCompany.ID){
			// } else {
			// 	this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);
			// }
		} else {
			if(this.currentTab === 'company' || this.currentTab === 'quotes') {
				this.router.navigate(['/contact']);
				this.currentTabChange.emit('contact');
			}
			this.currentContact = contact;
			this.currentContactChange.emit(contact);
		}
	}

	public removeContact(contact: Contact): void{
			this.currentContact = <Contact>{};
			this.currentContactChange.emit(<Contact>{});
			this.contactService.deleteContact(contact.ID).subscribe(() => {
			this.toastr.warning('Removed ' + contact.Name);
			//this.onSelectContact(contact);
			this.contactService.getContacts().subscribe(contacts => {
				this.contacts = contacts;
			})
		}, error => this.toastr.error('There Are Notes Related to ' + contact.Name + 'Please delete them first.' ));
	}

	public removeCompany(company): void{
		this.companyService.deleteCompany(company.ID).subscribe(() => {
			this.toastr.warning('Removed ' + company.Name);
			this.currentCompany = <Company>{};
			this.companyService.getCompanies().subscribe(companies => this.companies = companies);
		}, error => this.toastr.error('Oh no! Something went wrong with removing ' + company.Name + ' please try again later.'));
	}

}