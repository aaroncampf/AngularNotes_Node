import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Note} from '../models/note.model';
import {NotesService} from '../services/notes.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'notes-component',
	template: `
	<h4>All Notes</h4>
	<div *ngIf="!!notes">
		<div class="card" *ngFor="let note of notes" >
			<i class="glyphicon glyphicon-remove pull-right" (click)="removeNote(note.ID)"></i>
				<input-component label="Title" [model]="note.Title" [control]="titleControl" ></input-component>
				<!--<input type="text" (blur)="updateNote(note, note.ID)" class="form-control" [(ngModel)]="note.Title" [formControl]="titleControl" />-->
				{{note.Title}}
				<textarea class="form-control" [(ngModel)]="note.Text" [formControl]="textControl"></textarea>
		</div>
	</div>
`
})
export class NotesComponent implements OnInit, OnChanges {
	public notes: any[] = NOTES;
	public textControl: FormControl = new FormControl('', []);
	public titleControl: FormControl = new FormControl('', []);
	public noteGroup: FormGroup = new FormGroup({
		titleControl: this.titleControl,
		textControl: this.textControl
	});

	constructor(private noteService: NotesService){}

	ngOnChanges(changes: SimpleChanges) {
		console.log(changes);
	}

	public ngOnInit(): void {
		// this.noteService.getNotes().subscribe(notes => {
		// 	console.log('getNotes', notes);
		// 	this.notes = notes;
		// 	console.log('getNotes this', this.notes);
		//
		// })
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

export const NOTES: Note[]  = [
	{
		Contact: {
			Email: "From",
			ID: 16,
			Name: "Free",
			Phone: "Me",
			Position: "Error"
		},
		Date: "2017-03-24T18:13:38.223",
		ID: 26,
		Text: null,
		Title: null
	},
	{
		Contact: {
			Email: "From",
			ID: 16,
			Name: "Free",
			Phone: "Me",
			Position: "Error"
		},
		Date: "2017-03-24T18:13:38.223",
		ID: 26,
		Text: null,
		Title: "Patricia's Lecture Notes"
	},
	{
		Contact: {
			Email: "From",
			ID: 16,
			Name: "Free",
			Phone: "Me",
			Position: "Error"
		},
		Date: "2017-03-24T18:13:38.223",
		ID: 26,
		Text: null,
		Title: "Patricia's Lecture Notes"
	},
	{
		Contact: {
			Email: "From",
			ID: 16,
			Name: "Free",
			Phone: "Me",
			Position: "Error"
		},
		Date: "2017-03-24T18:13:38.223",
		ID: 26,
		Text: null,
		Title: "Patricia's Lecture Notes"
	}
]