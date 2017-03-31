import {Component, OnInit} from '@angular/core';
import {newNote, Note} from '../models/note.model';
import {NotesService} from '../services/notes.service';
import {Contact} from '../models/contact.model';
import {DataShareService} from '../services/data-share.service';
import {ToastsManager} from 'ng2-toastr/ng2-toastr'

@Component({
	selector: 'notes-component',
	template: `
	<h4>Contact Notes</h4>
	<button type="button" class="btn btn-block" (click)="addNote(selectedContact)" [disabled]="!selectedContact.ID" [class.disabled]="!selectedContact.ID">Add Note</button>
	<div class="card-panel" *ngFor="let note of notesCollection; let i = index;">
		<i class="glyphicon glyphicon-remove pull-right" (click)="removeNote(note.ID)"></i>
		<strong>Note #{{note.ID}}</strong> - <strong>{{note.Date | date: 'MM/dd/yyyy' }}</strong>
		<input class="col-xs-8" (blur)="updateNote(note, note.ID)" [(ngModel)]="note.Title"/>
		<textarea (blur)="updateNote(note, note.ID)" [(ngModel)]="note.Text"></textarea>
	</div>
	`
})
export class NotesComponent implements OnInit {
	public notesCollection: Note[];
	public selectedContact: Contact = <Contact>{};
	constructor(private noteService: NotesService,
				private dataShareService: DataShareService,
				public toastr: ToastsManager){}

	public ngOnInit(): void {
		this.dataShareService.contactSelected$
			.subscribe(contact => {
				this.selectedContact = contact;
				if(contact.ID) {
					this.noteService.getContactNotes(contact.ID)
						.subscribe(notes => this.notesCollection = notes);
				} else {
					this.noteService.getNotes()
						.subscribe(notes => this.notesCollection = notes);
				}
		});
	}

	public addNote(contact): void {
		let blankNote: Note = <Note>newNote();
		this.noteService.newNote(blankNote, contact.ID)
			.subscribe(() => {
				this.toastr.success('Note Created!');
				this.noteService.getContactNotes(contact.ID)
					.subscribe(notes => this.notesCollection = notes);
		}, error => this.toastr.error(error, 'Oops!'))
	}
	public updateNote(note: Note): void {
		this.noteService.updateNote(note)
			.subscribe(() => {});
	}

	public removeNote(id: number) {
		this.noteService.deleteNote(id).subscribe(() => {
			this.toastr.warning('Note Removed.');
			this.noteService.getContactNotes(this.selectedContact.ID)
				.subscribe(notes => this.notesCollection = notes);
		});
	}
}
