import {Component, OnInit} from '@angular/core';
import {} from '../global/components/list.component';
import {RESTService} from '../global/services/rest.service';
import {Note} from './note.model';

@Component({
	selector: 'notes-component',
	template: `
	<button class="btn btn-block" (click)="addNote()">Add A Note</button>
	<list-component (onSelect)="onSelection($event)" [listData]="notes"></list-component>
	`
})
export class NotesComponent implements OnInit {
	public notes: {}[] = [];
	public currentID: string;
	public getPath: string = `http://angularnotes-angularbros.azurewebsites.net/api/Notes`;
	public setPath: string = `http://angularnotes-angularbros.azurewebsites.net/api/Notes/${this.currentID}`;

	constructor(private restService: RESTService){}

	public ngOnInit(): void {
		this.restService.callPath('get', this.getPath, <Note>{})
			.subscribe((response: any) => {
				this.notes = response
			})
	}

	public onSelection(e): void {
		this.currentID = e;
		console.log(e);
	}

	public addNote(): void {

	}
}