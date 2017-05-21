import {Component, NgZone, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {Router} from '@angular/router';
import {User} from '../users/user.model';
import 'rxjs/rx';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {UsersService,} from '../users/users.services';
import {FormsService} from '../forms/services/forms.service';
import {StateService} from '../store/service/state.service';
import {Company} from './models/company.model';
import {RDCache} from '../store/models/typescript-cache.model';
import {CRMService} from './services/crm.service';
import {CRMState, STATE_INITIAL_STATE} from '../store/models/state.model';
import {Store} from '@ngrx/store';
import '../styles/main.scss';

@Component({
	selector: 'main',
	template: `
		<div class="container">
			<div *ngIf="!!MOBILE">
				<mobile-dashboard-component (action)="action($event)"
											[state$]="state$"></mobile-dashboard-component>
				<router-outlet></router-outlet>
				<side-menu [class.collapse]="state$.sideMenu" [rdc]="rdc$" [state$]="state$"
						   (action)="action($event)"></side-menu>
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

export class MainComponent implements OnInit, OnDestroy {
	private windowWidth: number = void 0;
	public sideMenuDataReady: boolean = false;
	public rdc$: RDCache = <RDCache>{};
	public state$: CRMState = <CRMState>STATE_INITIAL_STATE;
	public stateSub: Subscription;
	public rdCacheSub: Subscription;
	public companies: Observable<Company[]>;

	public get MOBILE(): boolean {
		return this.windowWidth < 768;
	}

	constructor(public toastr: ToastsManager,
				private _store: Store<any>,
				public router: Router,
				public vcr: ViewContainerRef,
				public ngZone: NgZone,
				private crmService: CRMService,
				private formsService: FormsService,
				private stateService: StateService,
				private userServices: UsersService
	) {
		this.toastr.setRootViewContainerRef(vcr);
	}

	public ngOnDestroy(): void {
		this.rdCacheSub.unsubscribe();
		this.stateSub.unsubscribe();
	}

	public initRDC(initialState?: RDCache): Promise<RDCache> {
		return this.stateService.initTC(initialState)
	}

	public ngOnInit(): void {
		this.detectWindowSize();
		//todo Subscribe to initial state and event subscriptions
		this.rdCacheSub = this.stateService.tcSource
			.subscribe((updated: RDCache = <RDCache>{}) => {
				this.rdc$ = Object.assign({}, this.rdc$, updated);
				console.log('rdc$', this.rdc$);
		});
		this.stateSub = this._store.select('crm').subscribe((update: CRMState[]) => {
			const lastIndex = update.length - 1;
			this.state$ = <CRMState>update[lastIndex];
			console.log('state$', this.state$);
		});
		this.userServices.initializeUserState().then((user: User) => {
			this.initRDC().then(rdc => {
				this.stateService.setTCProp({user: user});
				this.stateService.setTCProp(rdc);
				this._store.dispatch({type: 'SIDE_MENU_INITIALIZE', payload: {}});
				this.initSideMenu().then(res => {
					this._store.dispatch({type: 'SIDE_MENU_INITIALIZE_SUCCESS', payload: {}});
					console.log('build res', res);
				});
			});
		});
	}

	private initSideMenu(): Promise<any> {
		return new Promise(() => {
			this.stateService.dispatch('COMPANIES_GET', {});
			this.crmService.getCompanies()
				.then((companies) => {
					this.stateService.dispatch('COMPANIES_GET_SUCCESS', {companies: companies});
					this.formsService.ListBuilder(companies)
						.then(list => {
							this.stateService.dispatch('FORM_DATA_BUILD_SUCCESS', {companiesList: list});
					});
			});
			this.crmService.getContacts()
				.then((contacts) => {
					this.stateService.dispatch('CONTACTS_GET_SUCCESS', {contacts: contacts});
					this.formsService.ListBuilder(contacts)
						.then(list => {
							this.stateService.dispatch('FORM_DATA_BUILD_SUCCESS', {contactsList: list});
					});
			});
		});
	}

	private detectWindowSize(): void {
		this.windowWidth = window.innerWidth;
		window.onresize = () => {
			this.ngZone.run(() => {
				this.windowWidth = window.innerWidth;
			})
		}
	}

	public action(event): void {
		console.log('action', event);
		this._store.dispatch({type:event.type, payload:event.payload});

	}
}


