import {animate, Component, OnInit, state, style, transition, trigger} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Contact} from '../models/contact.model';
import {ContactService} from '../services/contact.service';
import {CompanyService} from '../services/companies.service';
import {timeout} from 'rxjs/operator/timeout';

@Component({
	selector: 'edit-contact-component',
	animations: [
		trigger('contentState', [
			state('in', style({
				opacity: '1',
				transform: 'translateY(0%)'
			})),
			state('out', style({
				opacity: '0',
				transform: 'translateX(200%)'
			})),
			transition('void => in', [
				style({transform: 'translateY(-100%)'}),
				animate('400ms, ease-out'),
			]),
			transition('in => out', [
				animate('400ms, ease-in'),])
		])
	],
	host: {'[@contentState]': ''},
	template: `
		<div class="container" [@contentState]="animateState">
			<div class="navbar navbar-fixed-top">
				<button type="reset" class="btn-danger pull-left" [routerLink]="['/companies']">Cancel</button>
			</div>
			<h4>Add A Contact for {{company}}</h4>
			<form [formGroup]="contactGroup" (ngSubmit)="saveContact()">
				<input-component label="Name" [(model)]="contact.Name" [control]="nameControl"></input-component>
				<input-component label="Phone" [(model)]="contact.Phone" [control]="phoneControl"></input-component>
				<input-component label="Email" [(model)]="contact.Email" [control]="emailControl"></input-component>
				<input-component label="Position" [(model)]="contact.Position" [control]="positionControl"></input-component>
				<button type="submit" class="btn btn-large pull-right">Save</button>
			</form>
		</div>
	`,
})

export class EditContactComponent implements OnInit{
	public animateState: string = 'in';
	public companyId: string;
	public contactId: string;
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
		console.log('saving', this.contact);
		this.contactService.updateContact(this.contact, +this.contact.ID).subscribe(response => {
			console.log('company was saved: ', response);
			this.animateState = 'out';
			setTimeout(() => {
				this.router.navigate(['/contacts', this.contact.ID]);
			}, 500)
		})
	}

	public ngOnInit() {
		this.route.params.subscribe(params => {
			this.contactService.getContact(params['id']).subscribe(contact => {
				this.contact = contact;
			});
		})
	}

}