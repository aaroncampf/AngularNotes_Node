import {Component, NgZone, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import '../styles/main.scss';
import {UsersService, } from '../users/users.services';
import {FIXTURE_USER_ID} from '../shared/models/FIXTURE_ID';
import {Subscription} from 'rxjs/Subscription';
import {TWT} from '../users/user.model';
import {Router} from '@angular/router';
import {TWSTStore} from '../shared/typescript-writable-state-tokens/twst.component';
import {Observable} from 'rxjs/Observable';

@Component({
	selector: 'main',
	template: `
	<div class="container">
		<div *ngIf="!!MOBILE">
			<m-dashboard-component (toggleMenu)="actionsDispatch($event)" (newTouched)="actionsDispatch($event)" [viewContext]="twt.viewContext"></m-dashboard-component>			
			<!--<mobile-navigation-component></mobile-navigation-component>-->
			<router-outlet></router-outlet>
			<side-menu [twtRef]="twst.ui | async" (action)="actionsDispatch($event)"></side-menu>
		</div>
		<div *ngIf="!MOBILE">
			<h1>Wide dashboard coming soon</h1>
			<h1>nav</h1>
			<h1 class="pull-left">side-panel</h1>
		<router-outlet name="wide-screen"></router-outlet>
		</div>
	</div>
	`,
	})

export class MainComponent implements OnInit {
	private windowWidth: number = void 0;
	public state: TWSTStore = <{}>{};
	public get MOBILE(): boolean {
		return this.windowWidth < 768;
	}

	constructor(public toastr: ToastsManager,
				public router: Router,
				public vcr: ViewContainerRef,
				public ngZone: NgZone,
				private twstService: TWSTStore,
				private twst: Observable<any>,
				private userServices: UsersService,) {
		this.toastr.setRootViewContainerRef(vcr);
	}

	public ngOnInit(): void {
		this.detectWindowSize();
		this.initializeUserState();
		this.twst = this.twstService.twst;
		// this.twst.ui = this.twst.;
	}

	public actionsDispatch(action: string, payload: any): void {

		switch(action) {
			case'menuToggle':
			case'newcompanies':
				this.router.navigate(['/forms/create']);
			case'touched':
				this.twstService.reduceToState({type: action, payload: payload});
			case'swiped-left':
				this.twstService.reduceToState({type: action.split('-')[0], payload: payload});
			case'swiped-right':
				this.twstService.reduceToState({type: action.split('-')[0], payload: payload});
			case'entered':
		}
	}


	private stateReducer(): void {
		// Object.assign(this.twt, this.twt.
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
