import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CRMDataService} from '../../services/crm-data.service';
import {Contact} from '../../models/contact.model';
import {ToastsManager} from 'ng2-toastr';
import {CRMStoreService} from '../../services/crm-store.service';
import {Subscription} from 'rxjs/Subscription';
@Component({
	selector: 'create-contact-component',
	template: `
		<h4>Add Contact</h4>
		<div *ngIf="!ownerID">
			<h5>Please Select A Company First</h5>
		</div>
		<div *ngIf="!!ownerID">
			<form [formGroup]="addForm">
				<single-line-text-input-component label="Name" [(model)]="newContact.name"
												  [control]="nameControl"></single-line-text-input-component>
				<single-line-text-input-component label="Phone" [(model)]="newContact.phone"
												  [control]="phoneControl"></single-line-text-input-component>
				<single-line-text-input-component label="Email" [(model)]="newContact.email"
												  [control]="emailControl"></single-line-text-input-component>
				<single-line-text-input-component label="Position" [(model)]="newContact.position"
												  [control]="positionControl"></single-line-text-input-component>
				<button type="reset" class="btn-warning btn-lg pull-left" [routerLink]="['/Contacts']">Cancel</button>
				<button type="button" class="btn-success btn-lg pull-right" (click)="onSubmit(addForm.value)">Submit</button>
			</form>
		</div>
	`
})
export class AddContactComponent implements OnInit, OnDestroy {
	public crmStateSub: Subscription;
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
		private crmData: CRMDataService,
		private crmStore: CRMStoreService,
	){}

	public ngOnDestroy(): void {
		this.crmStateSub.unsubscribe();
	}

	public ngOnInit(): void {
			this.crmStateSub = this.crmStore.crmStore$.subscribe(state => {
				if (state.selectedCompany && state.selectedCompany.id){
					this.ownerID = state.selectedCompany.id;
				} else {
					this.ownerID = null;
				}
			});
	}

	public onSubmit(values): void {
			console.log('submitting contact', values);
			this.crmData.newContact({owner_id: this.ownerID, props: values}).then(res => {
			this.toastr.success(res.name + ' added!');
			this.router.navigate(['/Contacts']);
		}).catch(err => {
			this.toastr.error('Oh No! Error with adding contact.');
			console.log(err)
		});
	}
}