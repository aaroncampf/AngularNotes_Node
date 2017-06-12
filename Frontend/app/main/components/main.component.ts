import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import 'rxjs/rx';
import '../styles/main.scss';
import {CRMDataService} from '../services/crm-data.service';
import {CRMStoreService} from '../services/crm-store.service';
import {FIXTURE_USER_ID} from './user/user-settings.component';

@Component({
	selector: 'main',
	template: `
		<div class="container">
			<div class="row">
				<dashboard-component class="col-xs-12">
				</dashboard-component>
				<navbar-component class="col-xs-12"></navbar-component>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<router-outlet></router-outlet>
				</div>
			</div>
		</div>
	`,
})

export class MainComponent implements OnInit, OnDestroy {
	constructor(
		public toastr: ToastsManager,
		public vcr: ViewContainerRef,
		private crmData: CRMDataService,
		private crmStore: CRMStoreService
	){
		this.toastr.setRootViewContainerRef(vcr);
	}

	public ngOnDestroy(): void {
	}

	public ngOnInit(): void {
		this.crmData.getUser({id: FIXTURE_USER_ID})
			.then(user => this.crmStore.crmUserDispatcher({type: 'USER_UPDATED', payload: {user: user}}));
	}
}


