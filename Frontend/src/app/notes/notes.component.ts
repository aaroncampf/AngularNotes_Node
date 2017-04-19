import {Component, OnInit} from '@angular/core';
import {ListData, newListData} from '../common/components/list.component';
import {RESTService} from '../common/services/rest.service';

@Component({
	selector: 'notes-component',
	template: `
	<list-component (onSelect)="onSelection($event)" [listData]="notes"></list-component>
	`
})
export class NotesComponent implements OnInit {
	public notes: ListData = <ListData>{};
	public currentID: string;
	public getPath: string = `http://angularnotes-angularbros.azurewebsites.net/api/Notes`;
	public setPath: string = `http://angularnotes-angularbros.azurewebsites.net/api/Notes/${this.currentID}`;

	constructor(private restService: RESTService){}

	public ngOnInit(): void {
		this.restService.callPath('get', this.getPath, {})
			.subscribe((response: any) => {
				console.log('notes', response);
				this.notes = newListData(response, void 0, 'Updated at Just Now!')
			})
	}

	public onSelection(e): void {
		this.currentID = e;
		console.log(e);
	}
}