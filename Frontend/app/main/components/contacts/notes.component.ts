import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CRMDataService} from '../../services/crm-data.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Note} from '../../models/note.model';
import {Observable} from 'rxjs/Observable';
import {ToastsManager} from 'ng2-toastr';
import * as _ from 'lodash';

@Component({
	selector: 'notes-component',
	template: `
		<h6>NOTES</h6>
		<button class="btn btn-block" (click)="addNote()">Add A Note</button>
		<note-container *ngFor="let note of (notes$ | async)">
			<note-header>
				<button class="btn-danger pull-right" (click)="removeNote({payload: {id: note.id}})">
					<span class="icon icon-cross"></span>
				</button>
				<single-line-text-input-component [model]="note.title"
												  (onChange)="setNote({payload: {id: note.id, prop: {key: 'title', value: $event}}})"></single-line-text-input-component>
			</note-header>
			<note-body class="note-body">
				<single-line-text-input-component [model]="note.text"
												  (onChange)="setNote({payload: {id: note.id, prop: {key: 'text', value: $event}}})"></single-line-text-input-component>
			</note-body>
		</note-container>
	`
})
export class NotesComponent implements OnChanges {
	@Input()
	public contactID: string;
	private notesSource: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);
	public notes$: Observable<Note[]> = this.notesSource.asObservable();

	constructor(
		private crmService: CRMDataService,
		public toastr: ToastsManager
	){}

	public ngOnChanges(simpleChanges: SimpleChanges): void {
		if(simpleChanges['contactID'] && simpleChanges['contactID'].currentValue){
			this.crmService.getNotes({owner_id: this.contactID}).then(notes => {
				this.notesSource.next(_.reverse(notes));
			})
		}
	}

	public removeNote(action): void {
			this.crmService.removeNote(action.payload).then(res => {
				console.log('removed note', res);
				this.toastr.warning('Note Removed!');
				this.crmService.getNotes({owner_id: this.contactID}).then(notes => {
					this.notesSource.next(_.reverse(notes));
			});
		})
	}

	public setNote(action): void {
		this.crmService.setNote(action.payload).then(res => {
			console.log('note update res', res);
		})
	}

	public addNote(): void {
		this.crmService.newNote({owner_id: this.contactID}).then(res => {
			console.log(res);
			this.toastr.success('Note Added!');
			const updatedNotes = _.concat([res], this.notesSource.getValue());
			this.notesSource.next(updatedNotes);
		})
	}
}