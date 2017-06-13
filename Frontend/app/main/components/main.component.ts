import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import 'rxjs/rx';
import '../styles/main.scss';
import {CRMDataService} from '../services/crm-data.service';
import {CRMStore, CRMStoreService} from '../services/crm-store.service';
import {FIXTURE_USER_ID} from './user/user-settings.component';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {
	trigger,
	state,
	style,
	animate,
	transition
} from '@angular/animations';

@Component({
	selector: 'main',
	template: `
		<div class="container">
			<div class="row">
				<dashboard-component class="col-xs-12">
				</dashboard-component>
				<navbar-component [activeRoute]="state.activeRoute" [companySelected]="state.companySelected" [contactSelected]="state.contactSelected" [quoteSelected]="state.quoteSelected" (routeSelected)="routeWithDispatch($event)" class="col-xs-12"></navbar-component>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<router-outlet></router-outlet>
				</div>
			</div>
		</div>
	`,
	animations: [ trigger('flyInOut', [
		state('in', style({transform: 'translateX(0)'})),
		transition('void => *', [
			style({transform: 'translateX(-100%)'}),
			animate(100)
		]),
		transition('* => void', [
			animate(100, style({transform: 'translateX(100%)'}))
		])
	])]
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


