import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CRMService} from '../services/crm.service';
import {Contact} from '../models/contact.model';
import {ToastsManager} from 'ng2-toastr';
@Component({
	selector: 'create-contact-component',
	template: `
		<h1>Add Contact</h1>
		<form [formGroup]="addForm">
			<input-component label="Name" [(model)]="newContact.name"  [control]="nameControl"></input-component>
			<input-component label="Phone" [(model)]="newContact.phone" [control]="phoneControl"></input-component>
			<input-component label="Email" [(model)]="newContact.email" [control]="emailControl"></input-component>
			<input-component label="Position" [(model)]="newContact.position" [control]="positionControl"></input-component>
			<button type="button" class="btn pull-right" (click)="onSubmit(addForm.value)">Submit</button>
			<button type="reset" class="btn-warning pull-right">Clear</button>
		</form>
	`
})
export class AddContactComponent implements OnInit {
	public newContact: Contact = <Contact>{};
	public ownerID: string;
	public nameControl: FormControl = new FormControl('', []);
	public phoneControl: FormControl = new FormControl('', []);
	public emailControl: FormControl = new FormControl('', []);
	public positionControl: FormControl = new FormControl('', []);
	public addForm: FormGroup = new FormGroup({
		name: this.nameControl,
		phone: this.phoneControl,
		email: this.emailControl,
		position: this.positionControl,
	});
	constructor(
		public toastr: ToastsManager,
		private router: Router,
		private crmService: CRMService,
		private route: ActivatedRoute,
	){}

	public ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.ownerID = params.owner_id;
		})
	}

	public onSubmit(values): void {
			console.log('submitting contact', values);
			this.crmService.newContact({owner_id: this.ownerID, props: values}).then(res => {
			this.toastr.success(res.name + ' added!');
			this.router.navigate(['/Companies']);
		}).catch(err => {
			this.toastr.error('Oh No! Error with adding contact.');
			console.log(err)
		});
	}
}