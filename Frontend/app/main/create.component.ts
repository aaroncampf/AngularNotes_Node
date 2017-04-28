import {Component, NgZone, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import '../styles/main.scss';
import {UsersServices, TokenService} from '../users/users.services';
import {TWT, User} from '../users/user.model';
import {SocketService} from '../shared/services/socket.service';

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
				private userServices: UsersServices,
				private twtFactor: TokenService
	){
		this.toastr.setRootViewContainerRef(vcr);
	}

	public ngOnInit(): void {
		this.detectWindowSize();
		this.InitializeUserState();
	}

	private InitializeUserState(): void {
		//todo login or register
		// update twt with user info
		this.twtFactor.tokenFactory().then(token => {
			this.userServices.setTWTProp(<TWT>token);
		});
		//set state to default
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
