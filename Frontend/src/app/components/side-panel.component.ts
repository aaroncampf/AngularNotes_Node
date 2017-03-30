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
			<table class="table table-bordered table-hover drop-down">
				<div class="col-xs-12">
						<th>Companies</th>
				</div>
				<tbody>
					<div class="row card" [class.active]="currentCompany.ID === company.ID" [class.collapse]="currentCompany.ID && currentCompany.ID !== company.ID" *ngFor="let company of companies">
						<div class="col-xs-11" (click)="onSelectCompany(company)">{{company.Name}}</div>
						<div class="col-xs-1">
							<i class="glyphicon glyphicon-remove" (click)="removeCompany(company)"></i>
						</div>
					</div>
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
		this.companyService.createCompany().subscribe(response => {
			console.log('create response', response);
			this.toastr.success('Please provide a name for your new company.', 'Company Created!');
			this.currentCompany = <Company>{};
			this.onSelectCompany(<Company>{ID: response.ID})
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
			this.currentCompanyChange.emit(<Company>{});
			// this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);
		} else {
			console.log(this.currentTab);
			if(this.currentTab === 'contact' || this.currentTab === 'notes') {
				this.router.navigate(['/company']);
				this.currentTabChange.emit('company');
			}
			this.currentContact = <Contact>{};
			this.currentContactChange.emit(<Contact>{});
			this.currentCompany = company;
			this.currentCompanyChange.emit(company);
			// this.contactService.getCompanyContacts(company.ID).subscribe(contacts => this.contacts = contacts);
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