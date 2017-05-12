import {Component, OnDestroy, OnInit} from '@angular/core';
import {TWT} from '../../users/user.model';
import {Subscription} from 'rxjs/Subscription';
import {UsersService} from '../../users/users.services';
@Component({
	selector: 'mobile-view-component',
	template: `
		<dashboard-component [viewContext]="twt.viewContext"></dashboard-component>
		<navigation-component></navigation-component>
		<h1>mobile friendly</h1>
		<side-menu [twt]="twt"></side-menu>

	`,


})

export class MobileViewComponent implements OnInit, OnDestroy {
	public twtSub: Subscription;
	public twt: TWT = <TWT>{};
	constructor(
				private userServices: UsersService
	){}

	public ngOnInit(): void {
		this.twtSub = this.userServices.userState$.subscribe(twt => {
			this.twt = twt;
		})
	}
	public ngOnDestroy(): void {
					this.twtSub.unsubscribe();
	}
}