// import {Component, OnInit} from '@angular/core';
// import {User} from '../models/user.model';
// import {FormControl, FormGroup, Validators} from '@angular/forms';
// import {SocketService} from '../services/socket.service';
// import {EmailRegEx} from '../regex/email.regex';
// import {ToastsManager} from 'ng2-toastr';
// import {Router} from '@angular/router';
// import {RegistrationService} from './_old_registration.service';
// import {FormData} from '../models/form-data.model';
// import {DataShareService} from '../services/data-share.service';
//
// @Component({
// 	selector: 'RegistrationComponent',
// 	template: `
// 		<h2>Registration</h2>
// 		<form [formGroup]="registrationGroup">
// 			<input-component [(model)]="user.userName" [control]="nameControl"
// 							 placeholder="Your Name Please"></input-component>
// 			<input-component [(model)]="user.email" [control]="emailControl"
// 							 placeholder="Your Email Please"></input-component>
// 		</form>
// 		<input class="col-xs-9" [class.invalid]="!passMatched && password.length < 7" type="password"
// 			   [(ngModel)]="password" (ngModelChange)="passMatch(password, passwordToMatch)"
// 			   placeholder="Choose A Password" [formControl]="passwordControl"/>
// 		<input class="col-xs-9" [class.invalid]="!passMatched && passwordToMatch.length < 7" type="password"
// 			   [(ngModel)]="passwordToMatch" (ngModelChange)="passMatch(password, passwordToMatch)"
// 			   placeholder="Re-Enter The Password" [formControl]="passwordMatchControl"/>
// 		<button (click)="registerUser(user, password)" class="btn btn-large" type="button"
// 				[disabled]="!passMatched || password.length < 7 || passwordToMatch.length < 7"
// 				[class.disabled]="!passMatched || password.length < 7 || passwordToMatch.length < 7">Register
// 		</button>
// 		<button class="btn btn-large" type="button" (click)="loginGuest()">Proceed as Guest</button>
// 	`
// })
//
// export class RegistrationComponent implements OnInit {
//
// 	public user: User = <User>{};
// 	public password: string = '';
// 	public passwordToMatch: string = '';
// 	public passMatched: boolean;
// 	public nameControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
// 	public passwordControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
// 	public passwordMatchControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
// 	public emailControl: FormControl = new FormControl('', [Validators.required, Validators.pattern(EmailRegEx)]);
// 	public phoneControl: FormControl = new FormControl('', [Validators.maxLength(255)]);
// 	public passwordGroup: FormGroup = new FormGroup({
// 		passwordControl: this.passwordControl,
// 		passwordMatchControl: this.passwordMatchControl
// 	});
// 	public registrationGroup: FormGroup = new FormGroup({
// 		emailControl: this.emailControl,
// 		phoneControl: this.phoneControl
// 	});
//
// 	constructor(private socketService: SocketService,
// 				private registrationService: RegistrationService,
// 				private router: Router,
// 				public toastr: ToastsManager,
// 				private dataShare: DataShareService) {
// 	}
//
// 	public ngOnInit() {
// 		this.dataShare.isNavVisible(false);
// 	}
//
// 	//todo Server REF
// 	public registerUser(user: User, password: string, server: string = 'localhost:1729'): void {
// 		const formData: FormData = <FormData>{};
// 		formData.username = user.userName;
// 		formData.email = user.email;
// 		formData.password = password;
// 		//todo Formdata commign back empty
// 		this.registrationService.register(<FormData>{})
// 			.subscribe(response => response);
// 		this.socketService.responseSocket('register.user', formData, server)
// 			.subscribe(res => this.toastr.success('registered' + res));
// 	};
//
// 	public loginGuest(): void {
//
// 	};
//
// 	public passMatch(): void {
// 		if (this.password === this.passwordToMatch) {
// 			this.passMatched = true;
// 		} else {
// 			this.passMatched = false;
// 		}
// 	}
// }
