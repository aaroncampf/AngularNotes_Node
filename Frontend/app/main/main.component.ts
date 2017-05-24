import {Component, NgZone, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import {StateService} from '../store/service/state.service';
import {Observable} from 'rxjs/Observable';
import {UIService} from './services/ui.service';
import {FormsService} from '../forms/services/forms.service';
import 'rxjs/rx';
import '../styles/main.scss';

@Component({
	selector: 'main',
	template: `
		<div class="container">
			<div *ngIf="!!MOBILE">
				<mobile-dashboard-component [state]="(state$ | async| lastIndexed)"
											(action)="action($event)"
											[selected]="(cache$ | async | lastIndexed).selected"
				></mobile-dashboard-component>
				<mobile-navigation-component (action)="action($event)"></mobile-navigation-component>
			</div>
			<router-outlet></router-outlet>
			<div *ngIf="!MOBILE">
				<h1>Wide dashboard coming soon</h1>
				<h1>nav</h1>
				<h1 class="pull-left">side-panel</h1>
			</div>
			<div *ngIf="!!MOBILE">
				<side-menu *ngIf="(state$ | async | lastIndexed).sideMenuReady"
						   [state]="state$ | async | lastIndexed"
						   [cache]="cache$| async | lastIndexed"
						   [class.collapse]="!(state$| async | lastIndexed).sideMenu"
						   [companiesForm]="companiesForm" 
						   [contactsForm]="contactsForm" (action)="action($event)"></side-menu>
				<bottom-menu [class.collapse]="!(state$ | async | lastIndexed).bottomMenu"
							 [state]="state$ | async | lastIndexed"></bottom-menu>
			</div>
		</div>
	`,
})

export class MainComponent implements OnInit {
	private windowWidth: number = void 0;
	public state$: Observable<any>;
	public cache$: Observable<any>;
	public companiesForm: FormGroup;
	public contactsForm: FormGroup;

	public get MOBILE(): boolean {
		this.detectWindowSize();
		return this.windowWidth < 768;
	}

	constructor(public router: Router,
				private ui: UIService,
				private forms: FormsService,
				public ngZone: NgZone,
				public stateService: StateService,
				public toastr: ToastsManager,
				public vcr: ViewContainerRef) {
		this.toastr.setRootViewContainerRef(vcr);
	}

	public ngOnInit(): void {
		this.cache$ = this.stateService.cache$;
		this.state$ = this.stateService.state$;
		this.detectWindowSize();

		this.stateService.dispatch('STATE_MAIN_INIT', {
			dataReady: false,
			sideMenuReady: false,
			dashboardReady: false,
			bottomMenu: false
		}).then(() => this.stateService.dispatch('STATE_MAIN_INIT_SUCCESS', {dashboardReady: true}));
		this.companiesListUpdate();
		this.contactsListUpdate();
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
		this.stateService.dispatch(event.type, event.payload)
			.then(res =>
				this.toastr.success('action success'))
			.catch(err => console.log('error with action', err));
	}

	private contactsListUpdate(): void {
		this.stateService.dispatch('STATE_CONTACTS_LOADING', {companiesReady: false});
		this.stateService.dispatch('SERVICE_CONTACTS_GET', {}).then(contacts => {
			this.ui.initSideMenu()
				.then(() => {
					this.forms.ListBuilder(contacts)
						.then(list => {
							this.stateService.dispatch('CACHE_CONTACTS_LIST', {contactsList: list});
							this.contactsForm = new FormGroup(list.controls);
							this.stateService.dispatch('STATE_LIST_BUILD_SUCCESS', {
								contactsReady: true,
								dataReady: true
							});
							this.stateService.dispatch('STATE_SIDE_MENU_INIT_SUCCESS', {
								sideMenuReady: true,
								loading: false
							});
						});
				});
		});
	}

	private companiesListUpdate(): void {
		this.stateService.dispatch('STATE_COMPANIES_LOADING', {companiesReady: false});
		this.stateService.dispatch('SERVICE_COMPANIES_GET', {}).then(companies => {
			this.ui.initSideMenu()
				.then(() => {
					this.forms.ListBuilder(companies)
						.then(list => {
							this.stateService.dispatch('CACHE_COMPANIES_LIST', {companiesList: list});
							this.companiesForm = new FormGroup(list.controls);
							this.stateService.dispatch('STATE_LIST_BUILD_SUCCESS', {
								companiesReady: true,
								dataReady: true
							});
							this.stateService.dispatch('STATE_SIDE_MENU_INIT_SUCCESS', {
								sideMenuReady: true,
								loading: false
							});
						});
				})
		});
	}
}


