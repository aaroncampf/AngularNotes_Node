import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import 'rxjs/rx';
import '../styles/main.scss';
import {CRMDataService} from '../services/crm-data.service';
import {CRMStore, CRMStoreService} from '../services/crm-store.service';
import {FIXTURE_USER_ID} from './user/user-settings.component';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
	selector: 'main',
	template: `
	<div class="container main-container">
		<dashboard-component class="col-xs-12">
		</dashboard-component>
		<navbar-component [activeRoute]="state.activeRoute" [companySelected]="state.companySelected" [contactSelected]="state.contactSelected" [quoteSelected]="state.quoteSelected" (routeSelected)="routeWithDispatch($event)" class="col-xs-12"></navbar-component>
		<router-outlet></router-outlet>
	</div>
	`,

})

export class MainComponent implements OnInit, OnDestroy {
	public stateSub: Subscription;
	public state: CRMStore;
	constructor(
		private router: Router,
		public toastr: ToastsManager,
		public vcr: ViewContainerRef,
		private crmData: CRMDataService,
		private crmStore: CRMStoreService,
	){
		this.toastr.setRootViewContainerRef(vcr);
	}

	public ngOnDestroy(): void {
		this.stateSub.unsubscribe();
	}

	public ngOnInit(): void {
		this.stateSub = this.crmStore.crmStore$.subscribe(state => {
			this.state = state;
		});
		this.crmData.getUser({id: FIXTURE_USER_ID})
			.then(user => this.crmStore.crmUserDispatcher({type: 'USER_UPDATED', payload: {user: user}}));
	}

	public routeWithDispatch(route): void {
		this.crmStore.crmStoreDispatcher({type: 'ROUTE_NAVIGATED', payload: { route:route[0]}});
		this.router.navigate(route);
	}
}


