import {Component} from '@angular/core';
import {User} from '../models/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SocketService} from '../services/socket.service';
import {EmailRegEx} from '../regex/email.regex';
import {ToastsManager} from 'ng2-toastr';
import * as SHA256 from 'crypto-js/sha256';
import {Router} from '@angular/router';

@Component({
	selector: 'Registration' ,
	template: `		
	<h4>Welcome</h4>, please register or choose, "Proceed as Guest". 
	<form [formGroup]="registrationGroup" (ngSubmit)="registerUser(user, passwordControl.value)">
		<input-component label="User Name" [(model)]="user.name" [control]="nameControl" placeholder = "Your Name Please"></input-component>
		<input-component label="User Email" [(model)]="user.email" [control]="emailControl" placeholder = "Your Email Please"></input-component>
		<input-component label="User Phone" [(model)]="user.phone" [control]="phoneControl" placeholder = "Your Phone Please"></input-component>
		<input-component label="Choose Password" [(model)]="password" [control]="passwordControl" placeholder = "Choose a Password"></input-component>
		<input-component label="Password Again" [(model)]="passwordMatch" [control]="passwordMatchControl" placeholder = "Re-Enter Password"></input-component>
		<button class="btn btn-large" type="button" [disabled]="registrationGroup.invalid || passwordControl.value === passwordMatchControl.value" [class.disabled]="registrationGroup.invalid || passwordControl.value === passwordMatchControl.value">Register</button>
		<button class="btn btn-large" type="reset">Clear</button>
		<button class="btn btn-large" type="button" (click)="loginGuest()">Proceed as Guest</button>
	</form>
	`
})

export class RegistrationComponent {
	public user: User = <User>{};
	public passwordMatch: string;
	public nameControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
	public passwordControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
	public passwordMatchControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
	public emailControl: FormControl = new FormControl('', [Validators.required, Validators.pattern(EmailRegEx)]);
	public phoneControl: FormControl = new FormControl('', [Validators.maxLength(255)]);
	public registrationGroup: FormGroup = new FormGroup({
		passwordControl: this.passwordControl,
		passwordMatchControl: this.passwordMatchControl,
		emailControl: this.emailControl,
		phoneControl: this.phoneControl
	});

	constructor(private socketService: SocketService,
				private router: Router,
				public toastr: ToastsManager) {
	}

	public registerUser(user: User, password, module) {
		const body = {
			hash: SHA256(password),
			model: user
		};
		this.socketService.hotSocketCouple('register.user', body, 'localhost:1729')
			.subscribe(res => {
				this.toastr.success('registered' + res);
		});
	};

	public loginGuest(): void {

	};
}
