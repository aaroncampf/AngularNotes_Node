import {Component, Input, OnInit} from '@angular/core';
import {RESTService} from '../global/services/rest.service';
import {CRMType} from '../global/models/CRMTypes.type';
import {Contact} from './contact.model';

@Component({
	selector: 'contact-details-component',
	template: `
		<list-component [listData]="contacts"></list-component>
	`,
})

export class ContactsComponent implements OnInit{
	@Input()
	ownerId: number;
	public contacts: Contact[] = [];
	public currentID: string;
	public getPath: string = `http://angularnotes-angularbros.azurewebsites.net/api/Contact`;

	constructor(private restService: RESTService){}

	public ngOnInit(): void {
		if (this.ownerId) {
			this.restService.callPath('get', this.getPath + '/' + this.ownerId)
				.subscribe((contacts: Contact[]) => {
					this.contacts = contacts;
				})
		}
		this.restService.callPath('get', this.getPath, <CRMType>{})
			.subscribe((contacts: Contact[]) => {
				this.contacts = contacts;
		})
	}

}