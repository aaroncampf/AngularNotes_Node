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
	<data-loading-screen [dataReady]="dataReady"></data-loading-screen>
	<div *ngIf="dataReady">
		<h4>Contact Details</h4>
		<form [formGroup]="contactForm">
			<single-line-text-input-component label="Name" [model]="contact.name" [control]="nameControl"></single-line-text-input-component>
			<single-line-text-input-component label="Phone" [model]="contact.phone" [control]="phoneControl"></single-line-text-input-component>
			<single-line-text-input-component label="Email" [model]="contact.email" [control]="emailControl"></single-line-text-input-component>
			<single-line-text-input-component label="Position" [model]="contact.position" [control]="positionControl"></single-line-text-input-component>
			<notes-component [contactID]="contact.id"></notes-component>
			<div *ngIf="!checkRemove">
				<button type="button" class="btn-success btn-lg pull-left" (click)="onSave()">Save</button>
				<button type="button" class="btn-warning btn-lg pull-left" [routerLink]="['/Contacts']">Cancel</button>
				<button type="button" class="btn-danger pull-right" (click)="onCheckRemove()">REMOVE</button>
			</div>
		</form>
		<div class="check-remove" *ngIf="!!checkRemove">
			<h4>Are you sure you want to remove {{contact.name}}?</h4>
			<button type="button" class="btn-warning btn-lg pull-right" (click)="onCheckRemove()">Cancel</button>
			<button type="button" class="btn-danger btn-lg pull-right" (click)="onRemove()">REMOVE</button>
		</div>
	</div>
	`,
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
	public dataReady: boolean = false;
	public checkRemove: boolean = false;
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
			this.dataReady = true;
		})
	}

	public onSave(): void {
		this.crmData.setContact({id: this.contact.id, props: this.contactForm.value})
			.then(() => {
				this.toastr.success(this.contact.name  + ' has been saved!');
				this.router.navigate(['/Contacts']);
		})
	}


	public onRemove(): void {
		this.crmData.deleteContact({id: this.contact.id})
			.then(res => {
				console.log(res);
				this.toastr.warning(this.contact.name + ' has been removed!');
				this.crmStore.crmStoreDispatcher({type: 'CONTACT_SELECTED', payload: {contact: {}, company: {}}});
				this.router.navigate(['/Contacts']);
			})
	}

	public onCheckRemove(): void {
		this.checkRemove = !this.checkRemove;
	}

}