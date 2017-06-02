import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import 'rxjs/rx';
import '../styles/main.scss';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';

export interface NavigationState {
	outlet: string;
	sideMenu: boolean;
	bottomMenu: boolean;
}

export const INITIAL_NAVIGATION_STATE = {
	outlet: 'Home',
	sideMenu: false,
	bottomMenu: false
};

@Component({
	selector: 'main',
	template: `
	<div class="container">
		<div class="row">
			<mobile-dashboard-component class="col-xs-12"> 
			</mobile-dashboard-component>
		</div>
		<div class="row">
			<side-menu class="col-xs-2"></side-menu>
			<div class="col-xs-10">
				<router-outlet></router-outlet>
			</div>
		</div>
	</div>
	`,
})

export class MainComponent implements OnInit, OnDestroy {
	constructor(
		public toastr: ToastsManager,
		public vcr: ViewContainerRef
	){
		this.toastr.setRootViewContainerRef(vcr);
	}

	public ngOnDestroy(): void {
	}

	public ngOnInit(): void {
	}
}


