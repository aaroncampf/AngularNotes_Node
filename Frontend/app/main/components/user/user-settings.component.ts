import {Component, OnDestroy, OnInit} from '@angular/core';
import {CRMDataService} from '../../services/crm-data.service';
import {FormControl, FormGroup} from '@angular/forms';
import {User} from '../../models/user.model';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {CRMStoreService} from '../../services/crm-store.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

export const FIXTURE_USER_ID = 'd4cc9f0d-3c8c-4e3e-8493-c34abc46ec1d';

@Component({
	selector: 'settings',
	template: `
		<h5>Your Settings:</h5>
		<single-line-text-input-component label="First Name" [model]="user.firstName" [control]="firstNameControl"></single-line-text-input-component>
		<single-line-text-input-component label="Last Name" [model]="user.lastName" [control]="lastNameControl"></single-line-text-input-component>
		<single-line-text-input-component label="Email" [model]="user.email" [control]="emailControl"></single-line-text-input-component>
		<single-line-text-input-component label="Address" [model]="user.addressOne" [control]="addressOneControl"></single-line-text-input-component>
		<single-line-text-input-component label="Phone" [model]="user.phone" [control]="phoneControl"></single-line-text-input-component>
		<single-line-text-input-component label="Biz Name" [model]="user.businessName" [control]="businessNameControl"></single-line-text-input-component>
		<single-line-text-input-component label="Biz Web" [model]="user.businessWeb" [control]="businessWebControl"></single-line-text-input-component>
		<single-line-text-input-component label="Biz Phone" [model]="user.businessPhone" [control]="businessPhoneControl"></single-line-text-input-component>
		<single-line-text-input-component label="Biz Fax" [model]="user.businessFax" [control]="businessFaxControl"></single-line-text-input-component>
		<button class="btn-warning btn-lg pull-right" [routerLink]="['/Home']">Cancel</button>
		<button class="btn-success btn-lg pull-right" (click)="onSave()">Save</button>
	`,
	host: { '[@routeAnimation]': 'true' },
	styles: [':host { display: block;}'],
	animations: [
		trigger('routeAnimation', [
			state('*', style({transform: 'translateX(0)', opacity: 1})),
			transition('void => *', [
				style({transform: 'translateX(-100%)', opacity: 0}),
				animate('0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)')
			]),
			transition('* => void',
				animate('0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)', style({
					transform: 'translateX(100%)',
					opacity: 0
				}))
			)
		])
	]
})
export class UserSettingsComponent implements OnInit {
	public user: User = <User>{};
	public firstNameControl: FormControl = new FormControl('', []);
	public lastNameControl: FormControl = new FormControl('', []);
	public emailControl: FormControl = new FormControl('', []);
	public addressOneControl: FormControl = new FormControl('', []);
	public addressTwoControl: FormControl = new FormControl('', []);
	public phoneControl: FormControl = new FormControl('', []);
	public roleControl: FormControl = new FormControl('', []);
	public businessNameControl: FormControl = new FormControl('', []);
	public businessWebControl: FormControl = new FormControl('', []);
	public businessPhoneControl: FormControl = new FormControl('', []);
	public businessFaxControl: FormControl = new FormControl('', []);
	public userForm: FormGroup = new FormGroup({
		firstName: this.firstNameControl,
		lastName: this.lastNameControl,
		email: this.emailControl,
		addressOne: this.addressOneControl,
		addressTwo: this.addressTwoControl,
		phone: this.phoneControl,
		role: this.roleControl,
		businessName: this.businessNameControl,
		businessWeb: this.businessWebControl,
		businessPhone: this.businessPhoneControl,
		businessFax: this.businessFaxControl,
	});
	constructor(
		private router: Router,
		public toastr: ToastsManager,
		private crmData: CRMDataService,
		private crmStore: CRMStoreService,
	){}

	public ngOnInit(): void {
		this.crmData.getUser({id: FIXTURE_USER_ID})
			.then(user => {
				this.user = user;
		})
	}

	public onSave(): void {
		this.crmData.setUser({id: this.user.id, props: this.userForm.value})
			.then(user => {
			this.crmStore.crmUserDispatcher({type: 'USER_UPDATED', payload: {user: user}});
			this.toastr.success(user.firstName + ' is saved!');
			this.router.navigate(['/Home']);
		})
	}
}