import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Contact} from '../models/contact.model';
import {ContactService} from '../services/contact.service';
import {ActivatedRoute} from '@angular/router';
import {NotesService} from '../services/notes.service';
import {Note} from '../models/note.model';
import {Company} from '../models/company.model';

@Component({
	selector: 'contacts-component',
	template: `
		<div class="row">
			<form [formGroup]="contactsGroup">
				<div class="col-xs-4">
					<input-component label="Name:" [currentModel]="selectedContact" propKey="Name"
									 [apiPath]="notesRESTPath()" [idNumber]="selectedContact?.ID"
									 [control]="nameControl" [model]="selectedContact?.Name"></input-component>
					<input-component label="Phone:" [currentModel]="selectedContact" propKey="Phone"
									 [apiPath]="notesRESTPath()" [idNumber]="selectedContact?.ID"
									 [control]="phoneControl" [model]="selectedContact?.Phone"></input-component>
					<input-component label="Email:" [currentModel]="selectedContact" propKey="Email"
									 [apiPath]="notesRESTPath()" [idNumber]="selectedContact?.ID"
									 [control]="emailControl" [model]="selectedContact?.Email"></input-component>
					<input-component label="Position:" [currentModel]="selectedContact" propKey="Position"
									 [apiPath]="notesRESTPath()" [idNumber]="selectedContact?.ID"
									 [control]="positionControl" [model]="selectedContact?.Position"></input-component>
					<button type="button" class="btn btn-block" (click)="createContact(currentCompany.ID)"
							[disabled]="!currentCompany" [class.disabled]="!currentCompany">New Contact
					</button>
				</div>
			</form>
			<div class="col-xs-8">
				<table class="table table-bordered table-striped table-hover">
					<tr>
						<th>Name</th>
						<th>Phone</th>
						<th>Position</th>
					</tr>
					<tr *ngFor="let contact of contacts" (click)="contactSelect(contact)">
						<td>{{contact.Name}}</td>
						<td>{{contact.Phone}}</td>
						<td>{{contact.Position}}</td>
						<i class="glyphicon glyphicon-remove" (click)="removeContact(contact.ID)"></i>
					</tr>
				</table>
			</div>
		</div>
		<div class="row">
			<strong>Contact Notes</strong>
			<button type="button" class="btn btn-block" (click)="saveNote(newNote, selectedContact.ID)"
					[disabled]="!selectedContact" [class.disabled]="!selectedContact">New Note
			</button>
		</div>
		<div class="row panel" *ngFor="let note of notes; let i = index;">
			<button class="btn-danger pull-right" (click)="removeNote(note.ID)"><i
					class="glyphicon glyphicon-remove"></i></button>
			<strong>Note #{{note.ID}}</strong>
			<input class="col-xs-8" (blur)="saveNote(note, selectedContact.ID)" [(ngModel)]="note.Title"/>
			<textarea (blur)="saveNote(note, selectedContact.ID)" [(ngModel)]="note.Text"></textarea>
		</div>
	`,
})

export class ContactsComponent implements OnInit, OnChanges {
	@Input()
	public currentCompany: Company = <Company>{};
	public notesRESTPath: () => string = () => `http://angularnotes-angularbros.azurewebsites.net/api/Contact/`;
	public notes: Note[] = [];
	public date: Date = new Date(Date.now());
	public newNote: Note = {
		Date: this.date.toISOString(),
		Title: '',
		Text: ''
	};
	public newContact: Contact = <Contact>{
		Name: '',
		Email: '',
		Phone: ''
	};
	@Input()
	public selectedContact: Contact = <Contact>{};
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
				private route: ActivatedRoute,
				private notesService: NotesService) {}

	public ngOnChanges(changes: SimpleChanges): void {
		console.log('ngOnChanges', changes);
		if(this.currentCompany.ID > 0) {
			this.contactService.getCompanyContacts(this.currentCompany.ID).subscribe(response => {
				this.contacts = response;
			}, err => console.log('ngOnChanges getCompanyContacts error', err))
		}
	}
	public ngOnInit(): void {
		this.route.queryParams.subscribe(params => {
			if (params['contactId'] > 0 ) {
				this.contactService.getContact(params['contactId']).subscribe(contact => {
					this.contactSelect(contact.ID);
				});
			}
		});
	}

	public saveNote(note: Note, contactId: number): void {
		this.notesService.saveNote(note, contactId).subscribe(res => {
			this.notesService.getContactNotes(this.selectedContact).subscribe(notes => this.notes = notes);
		});
	}

	public removeNote(noteId: number): void {
		this.notesService.deleteNote(noteId).subscribe(res => {
			this.notesService.getContactNotes(this.selectedContact).subscribe(notes => this.notes = notes);
		});
	}

	public createContact(companyId: number): void {
		console.log(companyId);
		this.contactService.saveNewContact(this.newContact, companyId).subscribe(response => {

			this.contactService.getCompanyContacts(this.currentCompany.ID)
				.subscribe(contacts => {
					this.contacts = contacts;
					this.contactSelect(response['_body']);
				})
		})
	}

	public removeContact(contactId: number): void {
		this.contactService.deleteContact(contactId).subscribe(res => {
			this.contactService.getCompanyContacts(this.currentCompany.ID)
				.subscribe(contacts => this.contacts = contacts, err => console.log(err));
		});
	}

	public contactSelect(contactId: number): void {
		this.contactService.getContact(contactId).subscribe(contact => {
				this.selectedContact = contact;
				this.notesService.getContactNotes(this.selectedContact)
					.subscribe(notes => this.notes = notes)
			});
	}
}