import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Contact} from '../models/contact.model';
import {ContactService} from '../services/contact.service';
import {CompanyService} from '../services/companies.service';

@Component({
	selector: 'contact-details-component',
	template: `
		<div class="container">
			<div class="navbar navbar-fixed-top">
			</div>
			<h4>Contact Details</h4>
			<form [formGroup]="contactGroup" (ngSubmit)="saveContact()">
				<input-component (blurChange)="saveContact()" label="Name" [(model)]="contact.Name" [control]="nameControl"></input-component>
				<input-component (blurChange)="saveContact()" label="Phone" [(model)]="contact.Phone" [control]="phoneControl"></input-component>
				<input-component (blurChange)="saveContact()" label="Email" [(model)]="contact.Email" [control]="emailControl"></input-component>
				<input-component (blurChange)="saveContact()" label="Position" [(model)]="contact.Position" [control]="positionControl"></input-component>
			</form>
		</div>
	`,
})

export class ContactDetailsComponent implements OnInit{
	public animateState: string = 'in';
	public company: string;
	public contact: Contact = <Contact>{};
	public nameControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
	public positionControl: FormControl = new FormControl('', []);
	public emailControl: FormControl = new FormControl('', []);
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

	constructor(private contactService: ContactService, private companyService: CompanyService, private router: Router, private route: ActivatedRoute){}

	public saveContact(): void {
		this.contactService.updateContact(this.contact, +this.contact.ID).subscribe(response => {
			this.router.navigate(['/contacts', this.contact.ID]);
		})
	}

	public ngOnInit() {
	}

}