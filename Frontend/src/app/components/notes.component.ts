import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Note} from '../models/note.model';
import {NotesService} from '../services/notes.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Contact} from '../models/contact.model';

@Component({
	selector: 'notes-component',
	template: `
		<h4>Contact Notes</h4>
		<button type="button" class="btn btn-block" (click)="addNote(selectedContact.ID)" [disabled]="!selectedContact.ID" [class.disabled]="!selectedContact.ID">Add Note</button>
		<div class="row panel" *ngFor="let note of notesCollection; let i = index;">
			<button class="btn-danger pull-right" (click)="removeNote(note.ID)">
				<i class="glyphicon glyphicon-remove"></i>
			</button>
			<strong>Note #{{note.ID}}</strong> - <strong>{{note.Date | date: 'MM/dd/yyyy' }}</strong>
			<input class="col-xs-8" (blur)="updateNote(note, note.ID)" [(ngModel)]="note.Title"/>
			<textarea (blur)="updateNote(note, note.ID)" [(ngModel)]="note.Text"></textarea>
	`
})
export class NotesComponent implements OnInit, OnChanges {
	public notesCollection: Note[];
	public selectedContact: Contact = <Contact>{};

	constructor(private noteService: NotesService, private route: ActivatedRoute){}

	ngOnChanges(changes: SimpleChanges) {
		console.log(changes);
	}

	public ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.noteService.getContactNotes(params['id']).subscribe(notes => {
				this.notesCollection = notes;
			})
		})
	}

	public updateNote(note: Note): void {

		this.noteService.updateNote(note).subscribe(response => {
			console.log('notesCollection res 41', response);
			this.noteService.getNotes().subscribe(notes => this.notesCollection = notes);
		})
	}

	public removeNote(id: number) {
		this.noteService.deleteNote(id).subscribe(response => {
			this.noteService.getNotes().subscribe(notes => this.notesCollection = notes);
		});
	}
}
