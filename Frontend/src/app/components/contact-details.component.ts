import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Contact} from '../models/contact.model';
import {ContactService} from '../services/contact.service';
import {DataShareService} from '../services/data-share.service';
import {ToastsManager} from 'ng2-toastr/ng2-toastr'

@Component({
	selector: 'contact-details-component',
	template: `
	<div *ngIf="contact.ID">
		<h4>Contact Details</h4>
		<input-component (modelChange)="saveContact($event, 'Name')" label="Name" [model]="contact.Name" [control]="nameControl"></input-component>
		<input-component (modelChange)="saveContact($event, 'Phone')" label="Phone" [model]="contact.Phone" [control]="phoneControl"></input-component>
		<input-component (modelChange)="saveContact($event, 'Email')"label="Email" [model]="contact.Email" [control]="emailControl"></input-component>
		<input-component (modelChange)="saveContact($event, 'Position')"label="Position" [model]="contact.Position" [control]="positionControl"></input-component>
		<notes-component></notes-component>
	</div>
	<div *ngIf="!contact.ID">
		<h4>Please Select a contact for their details and notes.</h4>
	</div>
	`,
})

export class ContactDetailsComponent implements OnInit{
	public company: string;
	public contact: Contact = <Contact>{};
	public nameControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
	public positionControl: FormControl = new FormControl('', []);
	public emailControl: FormControl = new FormControl('', [Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]);
	public zipControl: FormControl = new FormControl('', []);
	public phoneControl: FormControl = new FormControl('', []);
	public miscControl: FormControl = new FormControl('', []);
	public contactGroup: FormGroup = new FormGroup({
		nameControl: this.nameControl,
		emailControl: this.emailControl,
		miscControl: this.miscControl,
		positionControl: this.positionControl,
		phoneControl: this.phoneControl,
	});
	constructor(private contactService: ContactService,
				private dataShareService: DataShareService,
				private toastr: ToastsManager){}

	public ngOnInit() {
		this.dataShareService.contactSelected$
			.subscribe(contact => this.contact = contact);
	}

	public saveContact(value: string, prop: string): void {
		if(!this.contactGroup.invalid) {
			this.contact[prop] = value;
			this.contactService.updateContact(this.contact, +this.contact.ID)
				.subscribe(() => {})
		} else {
			this.toastr.error('Please provide a name', 'Can\'t Save');
		}
	}

}