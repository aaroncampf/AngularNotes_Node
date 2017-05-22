import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import {StateService} from '../store/service/state.service';
import {Company} from './models/company.model';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import 'rxjs/rx';
import '../styles/main.scss';
import {UIService} from './services/ui.service';
import {FormsService} from '../forms/services/forms.service';

@Component({
	selector: 'main',
	template: `
		<div class="container">
			<div *ngIf="!!MOBILE">
				<router-outlet [name]="'mobile'"></router-outlet>
				<mobile-navigation-component></mobile-navigation-component>
				<mobile-dashboard-component [bottomMenu]="state$.bottomMenu" (action)="action($event)" [selected]="cache$.selected" [createContext]="state$.createContext" [viewContext]="state$.viewContext" [dashboardReady]="state$.dashboardReady"></mobile-dashboard-component>
				<side-menu *ngIf="state$.sideMenuReady" [companiesReady]="state$.companiesReady" [contactsReady]="state$.contactsReady" [class.collapse]="!state$.sideMenu" [companiesList]="cache$.companiesList" [companiesForm]="companiesForm" [contactsList]="cache$.contactsList" [contactsForm]="contactsForm" (action)="action($event)" ></side-menu>
				<bottom-menu></bottom-menu>
			</div>
			<div *ngIf="!MOBILE">
				<h1>Wide dashboard coming soon</h1>
				<h1>nav</h1>
				<router-outlet [name]="'wideScreen'"></router-outlet>
				<h1 class="pull-left">side-panel</h1>
			</div>
		</div>
	`,
})

export class MainComponent implements OnInit, OnDestroy  {
	private windowWidth: number = void 0;
	public state$: any = {sideMenuReady: false, sideMenu: false};
	public cache$: any = {};
	public stateSub: Subscription;
	public companiesForm: FormGroup;
	public contactsForm: FormGroup;
	public cacheSub: Subscription;
	public companies: Observable<Company[]>;

	public get MOBILE(): boolean {
		this.detectWindowSize();
		return this.windowWidth < 768;
	}

	constructor(
				public router: Router,
				private ui: UIService,
				private forms: FormsService,
				public toastr: ToastsManager,
				public ngZone: NgZone,
				public stateService: StateService,
	) {
	}
	public ngOnInit(): void {
		this.detectWindowSize();
		this.stateService.dispatch('STATE_MAIN_INIT',{dataReady: false, sideMenuReady: false, dashboardReady: false})
			.then(() => this.stateService.dispatch('STATE_MAIN_INIT_SUCCESS', {dashboardReady: true}));
		this.stateSub = this.stateService.state$.subscribe(update => {
			if(!!update) {
				this.state$ = update[update.length - 1];
			}
		});
		this.cacheSub = this.stateService.cache$.subscribe(update => {
			if(!!update){
				this.cache$ = update;
			}
		});
		this.stateService.dispatch('SERVICE_COMPANIES_GET', {}).then(companies => {
			this.ui.initSideMenu()
				.then(() => {
					this.stateService.dispatch('STATE_SIDE_MENU_INIT_SUCCESS', {sideMenuReady: true, loading: false});
					this.forms.ListBuilder(companies)
						.then(list => {
							this.stateService.dispatch('CACHE_COMPANIES_LIST', {companiesList: list});
							this.companiesForm = new FormGroup(list.controls);
							this.stateService.dispatch('STATE_LIST_BUILD_SUCCESS', {
								companiesReady: true,
								dataReady: true
							});
						});
					// this.forms.ListBuilder(this.cache$.contacts)

				})
		});

		this.stateService.dispatch('SERVICE_CONTACTS_GET', {}).then(contacts => {
			this.ui.initSideMenu()
				.then(() => {
					this.stateService.dispatch('STATE_SIDE_MENU_INIT_SUCCESS', {sideMenuReady: true, loading: false});
					this.forms.ListBuilder(contacts)
						.then(list => {
							this.stateService.dispatch('CACHE_CONTACTS_LIST', {contactsList:list});
							this.contactsForm = new FormGroup(list.controls);
							this.stateService.dispatch('STATE_LIST_BUILD_SUCCESS', {contactsReady: true, dataReady: true});
						});
					// this.forms.ListBuilder(this.cache$.contacts)

		});
				// 	.then(list => {
				// 		this.stateService.dispatch('CACHE_CONTACTS_LIST', {contactsList:list});
				// 		this.contactsForm = new FormGroup(list.controls);
				// 		this.stateService.dispatch('STATE_LIST_BUILD_SUCCESS', {contactsReady: true, dataReady: true});
				// 	});
		});
	}

	public ngOnDestroy(): void {
		this.stateSub.unsubscribe();
		this.cacheSub.unsubscribe();
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
			.then( res => this.toastr.success('action success'))
			.catch(err => console.log('error with action', err));
	}
}


