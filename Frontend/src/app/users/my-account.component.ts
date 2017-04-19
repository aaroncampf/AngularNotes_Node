import {Component, OnInit} from '@angular/core';
import {User} from './user.model';
import {FormDataFeed} from '../common/models/form-data.model';
import {SocketService} from '../common/services/socket.service';
import {FIXTURE_USER_ID} from '../common/models/FIXTURE_ID';

@Component({
	selector: 'my-account-component',
	template: `
	<form-details-component [formData]="userData" path="user"></form-details-component>
	`
})

export class MyAccountComponent implements OnInit{
	public userData: FormDataFeed = {
		title: 'My Account',
		header: 'All information here is public at the moment',
		items: [
			{
				label: 'test',
				controlName: 'testControl',
				require: false,
				validators: []
			},
			{
				label: 'test2',
				controlName: 'test2Control',
				require: false,
				validators: []
			},
		]
	};

	constructor(private socketService: SocketService) {}

	public ngOnInit(): void {
		this.socketService.responseSocket('user.get', {id: FIXTURE_USER_ID})
			.then(response => {
				console.log('response from ',response);
			})
	}


}