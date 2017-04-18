import {Component, OnDestroy, OnInit} from '@angular/core';
import {Settings} from '../common/models/setting.model';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from './user.service';
import {DataShareService} from '../common/services/data-share.service';
import {SocketService} from '../common/services/socket.service';
import {FIXTURE_USER_ID} from '../common/models/FIXTURE_ID';
import {User} from '../common/models/user.model';
import {SERVER_MAP} from '../common/models/servers.map';

@Component({
	selector: 'settings-component',
	template: `
		<button class="btn btn-default" [routerLink]="['../']">Back</button>
		<h4>User Settings</h4>
		<div class="col-xs-11">
			<input-component label="Name" [model]="userData.userName" (modelChange)="update('name', $event)" [control]="nameControl"></input-component>
			<input-component label="Email" [model]="userData.email" (modelChange)="update('email', $event)" [control]="emailControl"></input-component>
			<input-component label="Address" [model]="userData.address" (modelChange)="update('address', $event)" [control]="addressControl"></input-component>
			<input-component label="Phone" [model]="userData.phone" (modelChange)="update('phone', $event)" [control]="phoneControl"></input-component>
		</div>
	`
})

export class SettingsComponent implements OnInit, OnDestroy {
	public userID: string = FIXTURE_USER_ID;
	public userData: User = <User>{};
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
				private socketService: SocketService) {
	}

	public ngOnInit(): void {
		this.socketService.responseSocket(this.getPath, {id: FIXTURE_USER_ID})
			.subscribe((user: Settings) => {
				console.log('USER', user);
				this.userData = <User>{
					id: user.id,
					userName: user.name,
					email: user.email,
					address: user.address,
					phone: user.phone,
				};
			}, error => console.log('error', error));
		this.dataShareService.isNavVisible(false);
	};

	public update(key, value): void {
		console.log('value', value);
		// todo refoactor modulePort
		this.socketService.responseSocket(this.savePath, {id: this.userData.id, attributes: {[key]: value}})
			.subscribe(response => {
				console.log(response);
			});
	}

	public ngOnDestroy(): void {
		this.dataShareService.isNavVisible(true);
	}
}
