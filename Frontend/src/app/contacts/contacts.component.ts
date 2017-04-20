import {Component, OnInit} from '@angular/core';
import {RESTService} from '../common/services/rest.service';
import {ListData, newListData} from '../common/components/list.component';
import {CRMTypes} from '../common/models/CRMTypes.type';

@Component({
	selector: 'contact-details-component',
	template: `
		<list-component (onSelect)="onSelection($event)" [listData]="contacts"></list-component>
	`,
})

export class ContactsComponent implements OnInit{
	public contacts: ListData = <ListData>{};
	public currentID: string;
	public getPath: string = `http://angularnotes-angularbros.azurewebsites.net/api/Contact`;
	public setPath: string = `http://angularnotes-angularbros.azurewebsites.net/api/Contact/${this.currentID}`;

	constructor(private restService: RESTService){}

	public ngOnInit(): void {
		this.restService.callPath('get', this.getPath, <CRMTypes>{})
			.subscribe((response: any) => {
			this.contacts = newListData(response, void 0, 'Updated at Just Now!')
		})
	}

	public onSelection(e): void {
		this.currentID = e;
		console.log(e);
	}
}