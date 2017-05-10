import {Component, NgZone, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import '../styles/main.scss';
import {UsersService, } from '../users/users.services';
import {FIXTURE_USER_ID} from '../shared/models/FIXTURE_ID';

@Component({
	selector: 'main',
	template: `
	<div class="container">
		<div *ngIf="!!MOBILE">
			<dashboard-component></dashboard-component>			
			<navigation-component></navigation-component>				
		</div>
		<div *ngIf="!MOBILE">
			<h1>Wide dashboard coming soon</h1>
			<h1>nav</h1>
			<h1 class="pull-left">side-panel</h1>
		<router-outlet name="wide-screen"></router-outlet>
		</div>
		<router-outlet></router-outlet>
	</div>
	`,
	})

export class MainComponent implements OnInit {
	private windowWidth: number = void 0;

	public get MOBILE(): boolean {
		return this.windowWidth < 768;
	}

	constructor(public toastr: ToastsManager,
				public vcr: ViewContainerRef,
				public ngZone: NgZone,
				private userServices: UsersService,) {
		this.toastr.setRootViewContainerRef(vcr);
	}

	public ngOnInit(): void {
		this.detectWindowSize();
		this.initializeUserState();
	}

	private initializeUserState(): void {
		//todo login or register
		this.userServices.tokenFactory().then(token => {
			this.userServices.setTWTProp(token);
			this.userServices.getCurrentUserData(FIXTURE_USER_ID)
				.subscribe(user => {
					this.userServices.setTWTProp({user: user});
				});
		})
		// update twt with user info
	}

	private detectWindowSize(): void {
		this.windowWidth = window.innerWidth;
		window.onresize = () => {
			this.ngZone.run(() => {
				this.windowWidth = window.innerWidth;
			})
		};

	}
}
