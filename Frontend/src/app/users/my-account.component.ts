import {Component, OnInit} from '@angular/core';
import {User} from './user.model';
import {SocketService} from '../common/services/socket.service';
import {FIXTURE_USER_ID} from '../common/models/FIXTURE_ID';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EmailRegEx} from '../common/regex/email.regex';

@Component({
	selector: 'my-account-component',
	template: `
		<h4>My Account</h4>
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
		<input-component label="Business Email" [control]="businessEmailControl" [(model)]="user.businessEmail" (onBlur)="blurrySave($event, 'businessEmail')"></input-component>
	`
})

export class MyAccountComponent implements OnInit {
	public user: User = <User>{};
	public firstNameControl: FormControl = new FormControl('', []);
	public lastNameControl: FormControl = new FormControl('', []);
	public emailControl: FormControl = new FormControl('', [Validators.pattern(EmailRegEx)]);
	public addressOneControl: FormControl = new FormControl('', []);
	public addressTwoControl: FormControl = new FormControl('', []);
	public businessFaxControl: FormControl = new FormControl('', []);
	public businessNameControl: FormControl = new FormControl('', []);
	public businessPhoneControl: FormControl = new FormControl('', []);
	public businessEmailControl: FormControl = new FormControl('', []);
	public websiteControl: FormControl = new FormControl('', []);
	public phoneControl: FormControl = new FormControl('', []);
	public userGroup: FormGroup = new FormGroup({
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
		phone: this.phoneControl,
	});

	public updatePath: string = 'user.set';
	public getPath: string = 'user.get';
	constructor(private socketService: SocketService){}

	public ngOnInit(): void {
		this.socketService
			.responseSocket(this.getPath, {id: FIXTURE_USER_ID})
			.subscribe(user => {
				this.user = {
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					addressOne: user.addressOne,
					addressTwo: user.addressTwo,
					businessFax: user.businessFax,
					businessName: user.businessName,
					businessPhone: user.businessPhone,
					businessEmail: user.businessEmail,
					businessWeb: user.businessWeb,
					phone: user.phone,
					role: user.role
				};
			})
	}

	public blurrySave(value, key): void {
		console.log(value, key);
		this.socketService
			.responseSocket(this.updatePath, <UpdateObject>{
				id: this.user.id,
				prop: {
					key:[key],
					value: value
				}
			})
			.subscribe(response => {
			console.log('response', response);
		})
	}
}export interface UpdateObject {
	id: string;
	prop: {
		[key: string]: any
	}
}