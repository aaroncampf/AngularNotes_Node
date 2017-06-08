import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Contact} from '../models/contact.model';
import {CRMService} from '../services/crm.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
	selector: 'contact-component',
	template: `
		<h6>CONTACT</h6>
		<textarea-component label="Name"
						 (onChange)="setContact({id: contact.id, prop: { key: 'name', value: $event}})"
						 (modelChange)="setContact({id: contact.id, prop: { key: 'name', value: $event}})"
						 [model]="contact.name"></textarea-component>
		<textarea-component label="Phone"
						 (onChange)="setContact({id: contact.id, prop: { key: 'phone', value: $event}})"
						 (modelChange)="setContact({id: contact.id, prop: { key: 'phone', value: $event}})"
						 [model]="contact.phone"></textarea-component>
		<textarea-component label="Email"
						 (onChange)="setContact({id: contact.id, prop: { key: 'email', value: $event}})"
						 (modelChange)="setContact({id: contact.id, prop: { key: 'email', value: $event}})"
						 [model]="contact.email"></textarea-component>
		<textarea-component label="Position"
						 (onChange)="setContact({id: contact.id, prop: { key: 'position', value: $event}})"
						 (modelChange)="setContact({id: contact.id, prop: { key: 'position', value: $event}})"
						 [model]="contact.position"></textarea-component>
		<notes-component [contactID]="contact.id"></notes-component>
	`
})
export class ContactComponent implements OnInit, OnDestroy {
	public contact: Contact = <Contact>{};
	public paramsSub: Subscription;
	constructor(
		private crmService: CRMService,
		private route: ActivatedRoute
	){}

	public ngOnDestroy(): void {
		this.paramsSub.unsubscribe();
	}

	public ngOnInit(): void {
		this.paramsSub = this.route.params.subscribe(params => {
			this.crmService.getContacts({id: params.contact_id}).then((contact: Contact) => {
				this.contact = contact;
			});
		});
	}

	public setContact(payload): void {
			this.crmService.setContact(payload);
	}

}