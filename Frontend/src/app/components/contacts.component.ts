import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Contact} from '../models/contact.model';
import {ContactService} from '../services/contact.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotesService} from '../services/notes.service';
import {Note, NewNote, newNote} from '../models/note.model';
import {Company} from '../models/company.model';
import {CompanyService} from '../services/companies.service';

@Component({
	selector: 'contacts-component',
	template: `
		<div class="row">
			<h4>Contacts</h4>
			<div class="col-xs-4">
				<table class="table table-bordered table-hover">
					<thead>
					<tr>
						<th>Companies</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td (click)="selected(0)">Select All The Things!</td>
					</tr>
					<tr *ngFor="let company of companies">
						<td [class.active]="selectedCompany.ID === company.ID" (click)="selected(company.ID)">{{company.Name}}</td>
					</tr>
					</tbody>
				</table>
			</div>
			<div class="col-xs-8">
				<button type="button" class="btn btn-block" (click)="animateNavigation('/create-contact/' + selectedCompany.ID)" [disabled]="!selectedCompany.ID" [class.disabled]="!selectedCompany.ID">New Contact
				</button>
				<table class="table table-bordered table-hover table-condensed">
					<tr>
						<th>Name</th>
						<th>Phone</th>
						<th>Email</th>
						<th>Position</th>
					</tr>
					<tr *ngFor="let contact of contacts" [class.active]="contact.ID === selectedContact.ID">
						<td (click)="selected(selectedCompany.ID, contact.ID)">{{contact.Name}}</td>
						<td (click)="selected(selectedCompany.ID, contact.ID)">{{contact.Phone}}</td>
						<td (click)="selected(selectedCompany.ID, contact.ID)">{{contact.Email}}</td>
						<td (click)="selected(selectedCompany.ID, contact.ID)">{{contact.Position}}</td>
						<td>
							<i class="glyphicon glyphicon-edit" [routerLink]="['/edit-contact', contact.ID]"></i>
						</td>
						<td>
							<i class="glyphicon glyphicon-remove" (click)="removeContact(contact.ID)"></i>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="row">
			<h4>Contact Notes</h4>
			<button type="button" class="btn btn-block" (click)="addNote(newNote, selectedContact.ID)" [disabled]="!selectedContact.ID" [class.disabled]="!selectedContact.ID">Add Note</button>
		</div>
		<div class="row panel" *ngFor="let note of notes; let i = index;">
			<button class="btn-danger pull-right" (click)="removeNote(note.ID)">
				<i class="glyphicon glyphicon-remove"></i>
			</button>
			<strong>Note #{{note.ID}}</strong>
			<input class="col-xs-8" (blur)="updateNote(note, note.ID)" [(ngModel)]="note.Title"/>
			<textarea (blur)="updateNote(note, note.ID)" [(ngModel)]="note.Text"></textarea>
		</div>
	`,
})

export class ContactsComponent implements OnInit {
	@Output()
	public triggerStateChange: EventEmitter<any> = new EventEmitter<any>();
	public newNote: NewNote = <NewNote>{};
	public companies: Company[] = [];
	public companyId: number;
	public notes: Note[] = [];
	public selectedContact: Contact = <Contact>{};
	public selectedCompany: Company = <Company>{};
	public contacts: Contact[] = [];
	public nameControl: FormControl = new FormControl('', []);
	public emailControl: FormControl = new FormControl('', []);
	public titleControl: FormControl = new FormControl('', []);
	public positionControl: FormControl = new FormControl('', []);
	public phoneControl: FormControl = new FormControl('', []);
	public contactsGroup: FormGroup = new FormGroup({
		name: this.nameControl,
		email: this.emailControl,
		position: this.positionControl,
		phone: this.phoneControl,
		title: this.titleControl
	});
	constructor(private contactService: ContactService,
				private companyService: CompanyService,
				private route: ActivatedRoute,
				private router: Router,
				private notesService: NotesService) {}

	public ngOnInit(): void {
		this.route.queryParams.subscribe(params => {
			this.companyId = +params['id'];
		});
		this.companyService.getCompanies().subscribe(companies => {
			this.companies = companies;
		});
		this.contactService.getContacts().subscribe(contacts => {
			this.contacts = contacts;
		});
	}

	public selected(companyId: number, contactId?: number) {
		if (contactId) {
			for(let contact of this.contacts) {
				if (contact.ID === contactId) {
					this.selectedContact = contact;
					this.notesService.getContactNotes(this.selectedContact.ID)
						.subscribe(notes => this.notes = notes);
				}
			}
		} else if (companyId === 0) {
			this.selectedCompany = <Company>{};
			this.contactService.getContacts()
				.subscribe(contacts => this.contacts = contacts);
		} else {
			for(let company of this.companies){
				if (company.ID === companyId) {
					this.selectedCompany = company;
					this.contactService.getCompanyContacts(this.selectedCompany.ID)
						.subscribe(contacts => this.contacts = contacts);
				}
			}
		}
	}

	public addNote(note: Note, contactId: number): void {
		this.notesService.addNote(newNote, contactId).subscribe(res => {
			this.notesService.getContactNotes(this.selectedContact.ID).subscribe(notes => this.notes = notes);
		});
	}

	public updateNote(note: Note, noteId: number): any {
		this.notesService.updateNote(note, noteId).subscribe(response => {
			this.notesService.getContactNotes(this.selectedContact.ID).subscribe(notes => this.notes = notes);
		})
	}

	public removeNote(noteId: number): void {
		this.notesService.deleteNote(noteId).subscribe(res => {
			this.notesService.getContactNotes(this.selectedContact.ID).subscribe(notes => this.notes = notes);
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

	public animateNavigation(path: string): void {
		this.triggerStateChange.emit('0');
		setTimeout(() => {
			this.router.navigate([path]);
		}, 500)
	}
	// public contactSelect(contactId: number): void {
	// 	this.contactService.getContact(contactId).subscribe(contact => {
	// 			this.selectedContact = contact;
	// 			this.notesService.getContactNotes(this.selectedContact.ID)
	// 				.subscribe(notes => this.notes = notes)
	// 		});
	// }
}