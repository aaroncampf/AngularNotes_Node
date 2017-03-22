import {Component, OnInit} from '@angular/core';
import {Note} from '../models/note.model';
import {NotesService} from '../services/notes.service';

@Component({
	selector: 'notes-component',
	template: `
	<h4>All Notes</h4>
	<div class="card" *ngFor="let note of notes" >
		<i class="glyphicon glyphicon-remove pull-right" (click)="removeNote(note.ID)"></i>
		<card-header>
			<input-component label="Title" [apiPath]="notesRESTPath()" [idNumber]="note.Contact.ID" propKey="Title" [(model)]="note.Title"></input-component>
		</card-header>		
		<card-body>
			<textarea (blur)="updateProp(note, note.Contact.ID)">{{note.Text}}</textarea>
		</card-body>
		<card-footer>Relative Contact: {{note.Contact.Name}}</card-footer>
	</div>
`
})
export class NotesComponent implements OnInit {
	public notes: Note[];
	public notesRESTPath: () => string = () => 'http://angularnotes-angularbros.azurewebsites.net/api/Notes?ContactID=';
	constructor(private noteService: NotesService){}

	public ngOnInit(): void {
		this.noteService.getNotes().subscribe(notes => this.notes = notes);
	}

	public updateProp(note: Note, cid: number){
		this.noteService.saveNote(note, cid).subscribe(res => console.log('notes - updateProp', res));
	}

	public removeNote(id: number) {
		this.noteService.deleteNote(id).subscribe(res => {
			console.log('note - removeNote', res);
			this.noteService.getNotes().subscribe(notes => this.notes = notes);
		});
	}
}