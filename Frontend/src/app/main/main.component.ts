import {Component, NgZone, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import '../styles/main.scss';

@Component({
	selector: 'main',
	template: `
	<div class="container">
		<div *ngIf="!!MOBILE">
		<dashboard-component></dashboard-component>			
		<navigation-component></navigation-component>				
		</div>
		<div *ngIf="!MOBILE">
			<h1>Wide dashboard</h1>
			<h1>nav</h1>
			<h1 class="pull-left">side-panel</h1>
		</div>
		<router-outlet></router-outlet>
	</div>
	`,
	})

export class MainComponent implements OnInit {
	private windowWidth: number;
	public get MOBILE(): boolean {
		return this.windowWidth < 768;
	}
	constructor(public toastr: ToastsManager,
				public vcr: ViewContainerRef,
				public ngZone: NgZone
	){
		this.toastr.setRootViewContainerRef(vcr);
	}

	public ngOnInit(): void {
		this.detectWindowSize();
	}

	private detectWindowSize(): void {
		this.windowWidth = window.innerWidth;
		window.onresize = () => {
			this.ngZone.run(() => {
				this.windowWidth = window.innerWidth;
			})
		};

}

}
