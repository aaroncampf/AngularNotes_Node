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
import {Observer} from 'rxjs/Observer';

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
						   [state$]="state$ | async | lastIndexed"
						   [cache$]="cache$ | async"
						   [class.collapse]="!(state$| async | lastIndexed).sideMenu"
						   [companiesForm]="(cache$ | async).companiesList?.form" [actionResponse]="actionResponse | async"
						   [contactsForm]="(cache$ | async).contactsList?.form" (action)="action($event)"></side-menu>
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
	public actionResponse: Observable<any>;

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
		this.stateService.dispatch('STATE_MAIN_INIT', {
			dataReady: false,
			sideMenuReady: false,
			dashboardReady: false,
			bottomMenu: false
		});
		this.cache$ = this.stateService.cache$;
		this.state$ = this.stateService.state$;
		this.detectWindowSize();
		this.ui.companiesListUpdate();
		this.ui.contactsListUpdate();
		this.stateService.dispatch('STATE_MAIN_INIT_DONE', {
			dataReady: true,
			dashboardReady: true,
			sideMenuReady: true,
			bottomMenu: true
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
		console.log('action', event.type, event.payload);
		this.actionResponse = Observable.create((observer: Observer<any>)=> {
			this.stateService.dispatch(event.type, event.payload)
			.then(res => {
				observer.next(res);
				this.toastr.success('action success')
			}).catch(err => console.log('error with action', err));
		});
	}
}


