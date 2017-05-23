import {Component, NgZone, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import {StateService} from '../store/service/state.service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import 'rxjs/rx';
import '../styles/main.scss';
import {UIService} from './services/ui.service';
import {FormsService, ListControls} from '../forms/services/forms.service';
import {Observer} from 'rxjs/Observer';

@Component({
	selector: 'main',
	template: `
		<div class="container">
			<div *ngIf="!!MOBILE">
				<mobile-dashboard-component [sideMenu]="state$.sideMenu" [bottomMenu]="state$.bottomMenu"
											(action)="action($event)" [selected]="cache$.selected"
											[createContext]="state$.createContext" [viewContext]="state$.viewContext"
											[dashboardReady]="state$.dashboardReady"></mobile-dashboard-component>
				<mobile-navigation-component (action)="action($event)"></mobile-navigation-component>
			</div>
			<router-outlet></router-outlet>
			<div *ngIf="!MOBILE">
				<h1>Wide dashboard coming soon</h1>
				<h1>nav</h1>
				<h1 class="pull-left">side-panel</h1>
			</div>
			<div *ngIf="!!MOBILE">
				<side-menu *ngIf="state$.sideMenuReady" [companiesList]="companiesList | async" [companiesReady]="state$.companiesReady"
						   [contactsReady]="state$.contactsReady" [class.collapse]="!state$.sideMenu"
						   [companiesForm]="companiesForm" [contactsList]="cache$.contactsList"
						   [contactsForm]="contactsForm" (action)="action($event)"></side-menu>
				<bottom-menu [class.collapse]="!state$.bottomMenu" [viewContext]="state$.viewContext"></bottom-menu>
			</div>
		</div>
	`,
})

export class MainComponent implements OnInit, OnDestroy {
	private windowWidth: number = void 0;
	public state$: any = {sideMenuReady: false, sideMenu: false};
	public cache$: any = {};
	public stateSub: Subscription = new Subscription();
	public companiesForm: FormGroup;
	public contactsForm: FormGroup;
	public cacheSub: Subscription = new Subscription();
	public companiesControls: Observable<any[]> = new Observable<any[]>();
	public companiesQuestions: Observable<any[]> = new Observable<any[]>();
	public companiesItems: Observable<any[]> = new Observable<any[]>();
	public companiesList: Observable<any[]> = new Observable<any[]>();

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
		this.companiesList = Observable.create(observer => {
			this.stateService.cache$.subscribe(res => {
				observer.next(res.companiesList);
			})
		});
		this.detectWindowSize();

		this.stateService.dispatch('STATE_MAIN_INIT', {
			dataReady: false,
			sideMenuReady: false,
			dashboardReady: false,
			bottomMenu: false
		})
			.then(() => this.stateService.dispatch('STATE_MAIN_INIT_SUCCESS', {dashboardReady: true}));
		this.stateSub = this.stateService.state$.subscribe(update => {
			if (!!update) {
				this.state$ = update[update.length - 1];
			}
		});

		this.cacheSub = this.stateService.cache$.subscribe(update => {
			if (!!update) {
				this.cache$ = update;
			}
		});
		this.companiesListUpdate();
		this.contactsListUpdate();
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
			.then(res =>
				this.toastr.success('action success'))
			.catch(err => console.log('error with action', err));
	}

	private contactsListUpdate(): void {
		this.stateService.dispatch('STATE_CONTACTS_LOADING', {companiesReady: false});
		this.stateService.dispatch('SERVICE_CONTACTS_GET', {}).then(contacts => {
			this.ui.initSideMenu()
				.then(() => {
					this.stateService.dispatch('STATE_SIDE_MENU_INIT_SUCCESS', {sideMenuReady: true, loading: false});
					this.forms.ListBuilder(contacts)
						.then(list => {
							this.stateService.dispatch('CACHE_CONTACTS_LIST', {contactsList: list});
							this.contactsForm = new FormGroup(list.controls);
							this.stateService.dispatch('STATE_LIST_BUILD_SUCCESS', {
								contactsReady: true,
								dataReady: true
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
					this.stateService.dispatch('STATE_SIDE_MENU_INIT_SUCCESS', {sideMenuReady: true, loading: false});
					this.forms.ListBuilder(companies)
						.then(list => {
							this.companiesQuestions = Observable.create((observer: Observer<any[]>) => {
								observer.next(list.questions);
							});
							this.companiesItems = Observable.create((observer: Observer<any[]>) => {
								observer.next(list.items);
							});
							this.companiesControls = Observable.create((observer: Observer<ListControls>) => {
								observer.next(list.controls);
							});
							this.stateService.dispatch('CACHE_COMPANIES_LIST', {companiesList: list});
							this.companiesForm = new FormGroup(list.controls);
							this.stateService.dispatch('STATE_LIST_BUILD_SUCCESS', {
								companiesReady: true,
								dataReady: true
							});
						});
				})
		});
	}
}


