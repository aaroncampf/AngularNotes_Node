import {Component, OnInit} from '@angular/core';
import {RESTService} from '../global/services/rest.service';
import {CRMType} from '../global/models/CRMTypes.type';

@Component({
	selector: 'contact-details-component',
	template: `
		<list-component (onSelect)="onSelection($event)" [listData]="contacts"></list-component>
	`,
})

export class ContactsComponent implements OnInit{
	public contacts:{} = {};
	public currentID: string;
	public getPath: string = `http://angularnotes-angularbros.azurewebsites.net/api/Contact`;
	public setPath: string = `http://angularnotes-angularbros.azurewebsites.net/api/Contact/${this.currentID}`;

	constructor(private restService: RESTService){}

	public ngOnInit(): void {
		this.restService.callPath('get', this.getPath, <CRMType>{})
			.subscribe((response: any) => {
				this.contacts = response;
		})
	}

	public onSelection(e): void {
		this.currentID = e;
		console.log(e);
	}
}