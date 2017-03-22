import {
	AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input, OnChanges,
	OnInit, SimpleChanges
} from '@angular/core';
import {Company} from '../models/company.model';
import {FormControl, FormGroup} from '@angular/forms';
import {Contact} from '../models/contact.model';
import {ContactService} from '../services/contact.service';
import {ActivatedRoute} from '@angular/router';
import {NotesService} from '../services/notes.service';
import {Note} from '../models/note.model';

@Component({
	selector: 'contacts-component',
	template: `
	<div class="row">
		<form [formGroup]="contactsGroup" (ngSubmit)="saveContact()">
			<div class="col-xs-4">
				<input-component label="Name:" [control]="nameControl" [model]="selectedContact?.Name"></input-component>
				<input-component label="Phone:" [control]="phoneControl" [model]="selectedContact?.Phone"></input-component>
				<input-component label="Email:" [control]="emailControl" [model]="selectedContact?.Email"></input-component>
				<input-component label="Position:" [control]="positionControl" [model]="selectedContact?.Position"></input-component>
				<button type="submit" class="btn btn-lg">Save</button>
				<button type="button" class="btn btn-lg">New Contact</button>
				<button type="button" class="btn btn-lg" (click)="saveNote(newNote, selectedContact.ID)" [disabled]="!selectedContact" [class.disabled]="!selectedContact">New Note</button>
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
					<i class="glyphicon glyphicon-remove"></i>
				</tr>
			</table>
		</div>
	</div>
	<div class="row">
		<strong>Contact Notes</strong>
	</div>
	<div class="row panel" *ngFor="let note of notes; let i = index;">
		<button class="btn-danger pull-right"><i class="glyphicon glyphicon-remove"></i></button>
		<strong>Note #{{note.ID}}</strong>
		<input-component (onblur)="saveNote(note, selectedContact)" class="col-xs-8" [(model)]="note.Title"></input-component>
		<textarea (onblur)="saveNote(note, selectedContact)" [(ngModel)]="note.Text"></textarea>
	</div>
`,
})

export class ContactsComponent implements OnInit, OnChanges {
	public companyId: number;
	@Input()
	public pNotes: any;
	public notes: Note[] = [];
	public date: Date = new Date();
	public newNote: Note = {
		Date: this.date.getDate().toString(),
		Title: '',
		Text: ''
	};
	public selectedContact: Contact = <Contact>{};
	public contacts: Contact[] = [];
	public CompaniesData: Company[];
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

	public ngOnInit(): void {
		console.log(this.pNotes);
		this.route.queryParams.subscribe(params => {
			if (!!params['contactId'] && !!params['companyId']) {
				this.companyId = params['companyId'];
				this.contactService.getContacts().subscribe(response => {
					this.contacts = response;
				})
			}
		});
	}

	public ngOnChanges(changes: SimpleChanges) {
		console.log(changes['@contentState'].currentValue);
	}

	public saveContact(): void {
		const contact: Contact = {
			ID: this.selectedContact.ID,
			Name: this.contactsGroup.value.name,
			Email: this.contactsGroup.value.email,
			Phone: this.contactsGroup.value.phone,
			Position: this.contactsGroup.value.position,
		};
		this.contactService.saveContact(contact, this.companyId).subscribe(res => {
			this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);
		});
	}

	public saveNote(note: Note, contactId: number): void {
		this.notesService.saveNote(note, contactId).subscribe(res => {
			this.notesService.getContactNotes(contactId).subscribe(notes => this.notes = notes);
		});
	}

	public contactSelect(contact: Contact): void {
		this.selectedContact = contact;
		this.notesService.getContactNotes(contact.ID).subscribe(notes => {
			this.notes = notes
		})
	}
}
