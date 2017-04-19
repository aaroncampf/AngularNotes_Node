import {Component, OnInit} from '@angular/core';
import {User} from './user.model';
import {FormDataFeed} from '../common/models/form-data.model';
import {SocketService} from '../common/services/socket.service';
import {FIXTURE_USER_ID} from '../common/models/FIXTURE_ID';

@Component({
	selector: 'my-account-component',
	template: `
	<form-details-component [model]="user" path="user"></form-details-component>
	`
})

export class MyAccountComponent implements OnInit {
	public userData: FormDataFeed = <FormDataFeed>{};

	constructor(private socketService: SocketService) {
	}

	public user: User;

	public ngOnInit(): void {
		this.socketService.responseSocket('user.get', {id: FIXTURE_USER_ID}).subscribe(user => {
			this.user = user;
		})
	}

	private initForm() {
		this.userData = {
			title: 'My Account',
			header: 'All information here is public at the moment',
			items: []
		};
		for (let prop of Object.keys(this.user)) {
			this.userData.items.push({
				label: prop,
				validators: [],
			})
		}
	}
}