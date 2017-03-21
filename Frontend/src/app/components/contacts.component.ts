import {Component, OnInit} from '@angular/core';
import {Company} from '../models/company.model';
import {FormControl, FormGroup} from '@angular/forms';
import {Contact} from '../models/contact.model';
import {ContactService} from '../services/contact.service';
import {ActivatedRoute} from '@angular/router';

@Component({
	selector: 'contacts-component',
	template: `
	<div class="row">
		<div class="col-xs-6">
			<form [formGroup]="contactsGroup" (ngSubmit)="saveContact()">
				<input-component label="Name:" [control]="nameControl" [model]="contact?.Name"></input-component>
				<input-component label="Phone:" [control]="phoneControl" [model]="contact?.Phone"></input-component>
				<input-component label="Email:" [control]="emailControl" [model]="contact?.Email"></input-component>
				<input-component label="Position:" [control]="positionControl" [model]="contact?.Position"></input-component>
				<button type="submit" class="btn btn-lg">Save</button>
			</form>
		</div>
		<div class="col-xs-6">
			<table class="table table-bordered table-striped table-hover">
				<tr>
					<th>Date</th>
					<th>Title</th>
				</tr>
				<tr>
					<td>3/13/2017</td>
					<td>Title 1</td>
				</tr>
				<tr>
					<td>3/13/2017</td>
					<td>Title 1</td>
				</tr>
				<tr>
					<td>3/13/2017</td>
					<td>Title 1</td>
				</tr>
			</table>
		</div>
	</div>
	<div class="row">
	Notes
		<div class="row">
			<input-component label="Title" [control]="titleControl" ></input-component>
		</div>
		<textarea class="form-control"></textarea>
	</div>
`


})

export class ContactsComponent implements OnInit{
	public contact: Contact = <Contact>{};
	public CompaniesData: Company[];
	public nameControl: FormControl = new FormControl('', []);
	public emailControl: FormControl = new FormControl('', []);
	public titleControl: FormControl = new FormControl('', []);
	public positionControl: FormControl = new FormControl('', []);
	public phoneControl: FormControl = new FormControl('', []);
	public contactsGroup: FormGroup = new FormGroup({
		name: this.nameControl,
		email: this.emailControl,
		position: this.positionControl,
		phone: this.phoneControl,
		title: this.titleControl
	});
	constructor(private contactService: ContactService, private route: ActivatedRoute) {}

	public ngOnInit(): void {
		this.route.queryParams
			.subscribe(params => {
				if (!!params['contactId']) {
					this.contactService.getContact(params['contactId'])
						.subscribe(response => this.contact	= response)
				}
		});
	}

	public saveContact(): void {
		const contact: Contact = {
			ID: this.contact.ID,
			Name: this.contactsGroup.value.name,
			Email: this.contactsGroup.value.email,
			Phone: this.contactsGroup.value.phone,
			Position: this.contactsGroup.value.position,
		};
		this.contactService.saveContact(contact)
			.subscribe(res => console.log(res));
	}

}
