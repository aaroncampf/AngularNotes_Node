import {Component, OnInit} from '@angular/core';
import {User} from './user.model';
import {SocketService} from '../shared/services/socket.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EmailRegEx} from '../shared/regex/email.regex';
import {UsersService} from './users.services';
import {FIXTURE_USER_ID} from '../shared/models/FIXTURE_ID';

@Component({
	selector: 'my-account-component',
	template: `
		<h4>My Account Details</h4>
		<hr>
		<input-component label="First Name" [control]="firstNameControl" [(model)]="user.firstName" (onBlur)="blurrySave($event, 'firstName')"></input-component>
		<input-component label="Last Name" [control]="lastNameControl" [(model)]="user.lastName" (onBlur)="blurrySave($event, 'lastName')"></input-component>
		<input-component label="Email" [control]="emailControl" [(model)]="user.email" (onBlur)="blurrySave($event, 'email')"></input-component>
		<input-component label="Phone" [control]="phoneControl" [(model)]="user.phone" (onBlur)="blurrySave($event, 'phone')"></input-component>
		<input-component label="Website" [control]="websiteControl" [(model)]="user.businessWeb" (onBlur)="blurrySave($event, 'businessWeb')"></input-component>
		<input-component label="Address One" [control]="addressOneControl" [(model)]="user.addressOne" (onBlur)="blurrySave($event, 'addressOne')"></input-component>
		<input-component label="Address Two" [control]="addressTwoControl" [(model)]="user.addressTwo" (onBlur)="blurrySave($event, 'addressTwo')"></input-component>
		<input-component label="Business Fax" [control]="businessFaxControl" [(model)]="user.businessFax" (onBlur)="blurrySave($event, 'businessFax')"></input-component>
		<input-component label="Business Name" [control]="businessNameControl" [(model)]="user.businessName" (onBlur)="blurrySave($event, 'businessName')"></input-component>
		<input-component label="Business Phone" [control]="businessPhoneControl" [(model)]="user.businessPhone" (onBlur)="blurrySave($event, 'businessPhone')"></input-component>
	`
})

export class MyAccountComponent implements OnInit {
	public user: User = <User>{};
	public firstNameControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
	public lastNameControl: FormControl = new FormControl('', [Validators.maxLength(255)]);
	public emailControl: FormControl = new FormControl('', [Validators.required, Validators.pattern(EmailRegEx)]);
	public addressOneControl: FormControl = new FormControl('', [Validators.maxLength(255)]);
	public addressTwoControl: FormControl = new FormControl('', [Validators.maxLength(255)]);
	public businessFaxControl: FormControl = new FormControl('', [Validators.maxLength(24)]);
	public businessNameControl: FormControl = new FormControl('', [Validators.maxLength(255)]);
	public businessPhoneControl: FormControl = new FormControl('', [Validators.maxLength(24)]);
	public businessEmailControl: FormControl = new FormControl('', [Validators.pattern(EmailRegEx)]);
	public websiteControl: FormControl = new FormControl('', [Validators.maxLength(255)]);
	public phoneControl: FormControl = new FormControl('', [Validators.maxLength(255)]);
	public form: FormGroup = new FormGroup({
		firstName: this.firstNameControl,
		lastName: this.lastNameControl,
		email: this.emailControl,
		addressOne: this.addressOneControl,
		addressTwo: this.addressTwoControl,
		businessFax: this.businessFaxControl,
		businessName: this.businessNameControl,
		businessPhone: this.businessPhoneControl,
		businessEmail: this.businessEmailControl,
		website: this.websiteControl,
		phone: this.phoneControl
	});
	public updatePath: string = 'user.set';
	public getPath: string = 'user.get';
	constructor(private userServices: UsersService,
				private socketService: SocketService){}

	public ngOnInit(): void {
		this.socketService.responseSocket('user.get', {id: FIXTURE_USER_ID})
			.subscribe(user => this.user = user);
	}

	public blurrySave(value, key): void {
		this.socketService
			.responseSocket(this.updatePath, <UpdateObject>{
				id: this.user.id,
				prop: {
					key:[key],
					value: value
				}
			})
			.subscribe((response: User) => {
				console.log('value key', response);
				this.userServices.setTWTProp({user: response});
		})
	}
}export interface UpdateObject {
	id: string;
	prop: {
		[key: string]: any
	}
}