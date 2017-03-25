import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Note} from '../models/note.model';
import {NotesService} from '../services/notes.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
	selector: 'notes-component',
	template: `
		<h4>All Notes</h4>
			<div class="card" *ngFor="let note of notesCollection">
				{{note.Date | date: 'MM/dd/yyyy'}}
				<i class="glyphicon glyphicon-remove pull-right" (click)="removeNote(note.ID)"></i>
				<input type="text" (blur)="updateNote(note)" class="form-control" [(ngModel)]="note.Title">
				<textarea class="form-control" (blur)="updateNote(note)" [(ngModel)]="note.Text"></textarea>
				Related Contact: {{note.Contact.Name}}
			</div>
	`
})
export class NotesComponent implements OnInit, OnChanges {
	public notesCollection: Note[];

	constructor(private noteService: NotesService){}

	ngOnChanges(changes: SimpleChanges) {
		console.log(changes);
	}

	public ngOnInit(): void {
		this.noteService.getNotes().subscribe(notes => {
			console.log('getNotes', notes);
			this.notesCollection = notes;
			console.log('getNotes this', this.notesCollection);

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
