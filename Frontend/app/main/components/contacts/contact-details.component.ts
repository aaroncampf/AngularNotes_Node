import {Component, OnDestroy, OnInit} from '@angular/core';
import {Contact} from '../../models/contact.model';
import {CRMDataService} from '../../services/crm-data.service';
import {Subscription} from 'rxjs/Subscription';
import {CRMStoreService} from '../../services/crm-store.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';

@Component({
	selector: 'contact-details-component',
	template: `
		<h4>Contact Details</h4>
		<form [formGroup]="contactForm">
			<single-line-text-input-component label="Name" [model]="contact.name" [control]="nameControl"></single-line-text-input-component>
			<single-line-text-input-component label="Phone" [model]="contact.phone" [control]="phoneControl"></single-line-text-input-component>
			<single-line-text-input-component label="Email" [model]="contact.email" [control]="emailControl"></single-line-text-input-component>
			<single-line-text-input-component label="Position" [model]="contact.position" [control]="positionControl"></single-line-text-input-component>
			<notes-component [contactID]="contact.id"></notes-component>
			<button class="btn-warning btn-lg pull-right" [routerLink]="['/Contacts']">Cancel</button>
			<button class="btn-success btn-lg pull-right" (click)="onSave()">Save</button>
		</form>
	`
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
	public contact: Contact = <Contact>{};
	private stateSub: Subscription;
	nameControl: FormControl = new FormControl('', []);
	phoneControl: FormControl = new FormControl('', []);
	emailControl: FormControl = new FormControl('', []);
	positionControl: FormControl = new FormControl('', []);
	contactForm: FormGroup = new FormGroup({
		name: this.nameControl,
		phone: this.phoneControl,
		email: this.emailControl,
		position: this.positionControl,
	});

	constructor(
		private router: Router,
		public toastr: ToastsManager,
		private crmData: CRMDataService,
		private crmStore: CRMStoreService,
	){}

	public ngOnDestroy(): void {
			this.stateSub.unsubscribe();
	}

	public ngOnInit(): void {
		this.stateSub = this.crmStore.crmStore$.subscribe(state => {
			this.contact = state.selectedContact;
		})
	}

	public onSave(): void {
			this.crmData.setContact({id: this.contact.id, props: this.contactForm.value})
				.then(() => {
					this.toastr.success(this.contact.name  + ' has been saved!');
					this.router.navigate(['/Contacts']);
			})
	}

}