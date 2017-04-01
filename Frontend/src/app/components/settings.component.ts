import {Component, OnDestroy, OnInit} from '@angular/core';
import {
	Settings} from '../models/setting.model';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../services/user.service';
import {DataShareService} from '../services/data-share.service';
@Component({
	selector: 'settings-component',
	template: `
		<button class="btn btn-default" [routerLink]="['../']">Back</button>
		<h4>User Settings</h4>
		<div class="col-xs-2">User ID: {{number}}</div>
		<div class="col-xs-10"></div> 
		<input-component class="col-xs-6" label="Name" [(model)]="settings.Name" [control]="nameControl"></input-component>
		<input-component class="col-xs-6" label="Gmail" [(model)]="settings.Gmail" [control]="gmailControl"></input-component>
		<input-component class="col-xs-6" label="Gmail Password" [(model)]="settings.GmailPassword" [control]="gmailPasswordControl"></input-component>
		<input-component class="col-xs-6" label="Email" [(model)]="settings.Email" [control]="emailControl"></input-component>
		<input-component class="col-xs-6" label="Address" [(model)]="settings.Address" [control]="addressControl"></input-component>
		<input-component class="col-xs-6" label="Phone" [(model)]="settings.Phone" [control]="phoneControl"></input-component>
		<input-component class="col-xs-6" label="Company Name" [(model)]="settings.CompanyName" [control]="companyNameControl"></input-component>
		<input-component class="col-xs-6" label="Company Website" [(model)]="settings.CompanyWebsite" [control]="companyWebsiteControl"></input-component>
		<input-component class="col-xs-6" label="Company Phone" [(model)]="settings.CompanyPhone" [control]="companyPhoneControl"></input-component>
		<input-component class="col-xs-6" label="Cell Phone" [(model)]="settings.CellPhone" [control]="cellPhoneControl"></input-component>
		<input-component class="col-xs-6" label="Company Fax" [(model)]="settings.CompanyFax" [control]="companyFaxControl"></input-component>
	`
})

export class SettingsComponent implements OnInit, OnDestroy {
	public settings: Settings = <Settings>{};
	public nameControl: FormControl = new FormControl('', []);
	public gmailControl: FormControl = new FormControl('', []);
	public gmailPasswordControl: FormControl = new FormControl('', []);
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
		gmailControl: this.gmailControl,
		gmailPasswordControl: this.gmailPasswordControl,
		emailControl: this.emailControl,
		addressControl: this.addressControl,
		phoneControl: this.phoneControl,
		companyNameControl: this.companyNameControl,
		companyWebsiteControl: this.companyWebsiteControl,
		companyPhoneControl: this.companyPhoneControl,
		cellPhoneControl: this.cellPhoneControl,
		companyFaxControl: this.companyFaxControl
	});
	constructor(private user: UserService, private dataShareService: DataShareService){}

	public ngOnInit(): void {
		this.user.getSettings(1)
			.subscribe(settings => this.settings = settings);
		this.dataShareService.isNavVisible(false);
	}

	public ngOnDestroy(): void {
		this.dataShareService.isNavVisible(true);
	}

}