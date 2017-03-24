import {Component, OnInit} from '@angular/core';
import {Note} from '../models/note.model';
import {NotesService} from '../services/notes.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'notes-component',
	template: `
	<h4>All Notes</h4>
	<div class="card" *ngFor="let note of notes" >
		<i class="glyphicon glyphicon-remove pull-right" (click)="removeNote(note.ID)"></i>
		<!--<card-header>-->
			<input type="text" class="form-control" [(ngModel)]="note.Title" [formControl]="titleControl" />
			{{note.Title}}
		<!--</card-header>-->
		<!--<card-body>-->
			<textarea class="form-control" [(ngModel)]="note.Text" [formControl]="textControl"></textarea>
		<!--</card-body>-->
		<!--<card-footer>Relative Contact: {{note.Contact.Name}}</card-footer>-->
	</div>
`
})
export class NotesComponent implements OnInit {
	public notes: Note[] = [];
	public textControl: FormControl = new FormControl('', []);
	public titleControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
	public noteGroup: FormGroup = new FormGroup({
		titleControl: this.titleControl,
		textControl: this.textControl
	});

	constructor(private noteService: NotesService){}

	public ngOnInit(): void {
		this.noteService.getNotes().subscribe(notes => this.notes = notes);
	}

	public updateNote(note: Note, noteId: number): void {

		this.noteService.updateNote(note, noteId).subscribe(response => {
			console.log('notes res 41', response);
			this.noteService.getNotes().subscribe(notes => this.notes = notes);
		})
	}

	public removeNote(id: number) {
		this.noteService.deleteNote(id).subscribe(response => {
			this.noteService.getNotes().subscribe(notes => this.notes = notes);
		});
	}
}