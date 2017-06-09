import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import 'rxjs/rx';
import '../styles/main.scss';

@Component({
	selector: 'main',
	template: `
		<div class="container">
			<div class="row">
				<mobile-dashboard-component class="col-xs-12">
				</mobile-dashboard-component>
				<navbar class="col-xs-12"></navbar>
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
		public vcr: ViewContainerRef
	){
		this.toastr.setRootViewContainerRef(vcr);
	}

	public ngOnDestroy(): void {
	}

	public ngOnInit(): void {
	}
}


