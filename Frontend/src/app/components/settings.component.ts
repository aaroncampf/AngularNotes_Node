import {Component, OnDestroy, OnInit} from '@angular/core';
import {Settings} from '../models/setting.model';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../services/user.service';
import {DataShareService} from '../services/data-share.service';
import {SocketService} from '../services/socket.service';
import {FIXTURE_USER_ID} from '../models/FIXTURE_ID';


@Component({
	selector: 'settings-component',
	template: `
		<button class="btn btn-default" [routerLink]="['../']">Back</button>
		<h4>User Settings</h4>
		<div class="col-xs-2">User ID: {{number}}</div>
		<div class="col-xs-10"></div> 
		<input-component class="col-xs-6" label="Name" [model]="settings.name" (modelChange)="update('name', $event)" [control]="nameControl"></input-component>
		<input-component class="col-xs-6" label="Email" [model]="settings.email" (modelChange)="update('email', $event)" [control]="emailControl"></input-component>
		<input-component class="col-xs-6" label="Address" [model]="settings.address" (modelChange)="update('address', $event)" [control]="addressControl"></input-component>
		<input-component class="col-xs-6" label="Phone" [model]="settings.phone" (modelChange)="update('phone', $event)" [control]="phoneControl"></input-component>
		<input-component class="col-xs-6" label="Company Name" [model]="settings.companyName" (modelChange)="update('companyName', $event)" [control]="companyNameControl"></input-component>
		<input-component class="col-xs-6" label="Company Website" [model]="settings.companyWeb" (modelChange)="update('companyWeb',$event)" [control]="companyWebsiteControl"></input-component>
		<input-component class="col-xs-6" label="Company Phone" [model]="settings.companyPhone" (modelChange)="update('companyPhone', $event)" [control]="companyPhoneControl"></input-component>
		<input-component class="col-xs-6" label="Company Fax" [model]="settings.companyFax" (modelChange)="update('companyFax', $event)" [control]="companyFaxControl"></input-component>
	`
})

export class SettingsComponent implements OnInit, OnDestroy {
	public settings: Settings = <Settings>{};
	public nameControl: FormControl = new FormControl('', []);
	public emailControl: FormControl = new FormControl('', []);
	public addressControl: FormControl = new FormControl('', []);
	public phoneControl: FormControl = new FormControl('', []);
	public companyNameControl: FormControl = new FormControl('', []);
	public companyWebsiteControl: FormControl = new FormControl('', []);
	public companyPhoneControl: FormControl = new FormControl('', []);
	public cellPhoneControl: FormControl = new FormControl('', []);
	public companyFaxControl: FormControl = new FormControl('', []);
	public settingsGroup: FormGroup = new FormGroup({
		nameControl: this.nameControl,
		emailControl: this.emailControl,
		addressControl: this.addressControl,
		phoneControl: this.phoneControl,
		companyNameControl: this.companyNameControl,
		companyWebsiteControl: this.companyWebsiteControl,
		companyPhoneControl: this.companyPhoneControl,
		cellPhoneControl: this.cellPhoneControl,
		companyFaxControl: this.companyFaxControl
	});
	public savePath: string = 'post.user';
	public getPath: string = 'get.userById';
	constructor(private user: UserService,
				private dataShareService: DataShareService,
				private socketService: SocketService){}

	public ngOnInit(): void {
		this.socketService.socketCouple(this.getPath, {id: FIXTURE_USER_ID})
			.then((user: Settings) => {
			console.log('USER',user);
			this.settings = {
				id: user.id,
				name: user.name,
				email: user.email,
				address: user.address,
				companyFax: user.companyFax,
				companyName: user.companyName,
				companyPhone: user.companyPhone,
				companyWeb: user.companyWeb,
				passHash: user.passHash,
				phone: user.phone,
				role: user.role
			};
			console.log('this.setting 72', this.settings);
		}, error => console.log('error', error));
		this.dataShareService.isNavVisible(false);
	};

	public update(key, value): void {
		this.socketService.socketCouple(this.savePath, {id: this.settings.id, [key]: value})
			.then(response => {
			console.log(response);
		});
	}

	public ngOnDestroy(): void {
		this.dataShareService.isNavVisible(true);
	}
}
