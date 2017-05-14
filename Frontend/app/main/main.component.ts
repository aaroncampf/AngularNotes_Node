import {Component, NgZone, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import '../styles/main.scss';
import {UsersService,} from '../users/users.services';
import {FIXTURE_USER_ID} from './models/FIXTURE_ID';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {SocketService} from '../shared/services/socket.service';
import {User} from '../users/user.model';
import 'rxjs/rx';
import {Subscription} from 'rxjs/Subscription';
import {Session} from '../store/reducers/session.reducer';
import {FormsService} from '../forms/services/forms.service';
import {StateProjections} from '../store/reducers/state.projector';
import {WST, WST_INITIAL_STATE} from '../store/state-token/wst.model';
import {WritableStateTokenService} from '../store/state-token/wst.service';

@Component({
	selector: 'main',
	template: `
		<div class="container">
			<div *ngIf="!!MOBILE">
				<mobile-dashboard-component (toggleMenu)="action($event)" (action)="action($event)"
											[viewContext]='wst.viewContext'></mobile-dashboard-component>
				<router-outlet></router-outlet>
				<side-menu [details]="wst.details" *ngIf="wst.listItems?.controls" [selected]="wst.selected"
						   [listItems]="wst.listItems" [formContext]="wst.viewContext"
						   [controls]="wst.listItems?.controls" (action)="action($event)"></side-menu>
			</div>
			<div *ngIf="!MOBILE">
				<h1>Wide dashboard coming soon</h1>
				<h1>nav</h1>
				<h1 class="pull-left">side-panel</h1>
				<router-outlet name="wide-screen"></router-outlet>
			</div>
		</div>
	`,
})

export class MainComponent implements OnInit, OnDestroy {
	private windowWidth: number = void 0;
	public wstSub: Subscription = new Subscription();
	public storeSub: Subscription = new Subscription();
	public wst: WST = <WST>WST_INITIAL_STATE;

	public get MOBILE(): boolean {
		return this.windowWidth < 768;
	}

	constructor(public toastr: ToastsManager,
				public router: Router,
				public vcr: ViewContainerRef,
				public ngZone: NgZone,
				private wstService: WritableStateTokenService,
				private formsService: FormsService,
				private socketService: SocketService,
				private _store: Store<Session>,
				private userServices: UsersService,
				private state: StateProjections) {
		this.toastr.setRootViewContainerRef(vcr);
	}

	public ngOnDestroy(): void {
		this.storeSub.unsubscribe();
		this.wstSub.unsubscribe();
	}

	public ngOnInit(): void {
		this.detectWindowSize();
		//todo Subscribe to state and events
		this.wstSub = this.wstService.userState$.subscribe(wst => this.wst = wst);
		this.storeSub = this._store.subscribe((res: any) => {
			console.log('store hit', res);
			if (!Array.isArray(res)) {
				if (Object.keys(res)[0] === 'crm') {
					console.log('store hit crm', res);
					this.state.setState('crm', this._store);
				}
				if (Object.keys(res)[0] === 'user') {
					console.log('store hit user', res);
					this.state.setState('user', this._store);
				}
				if (Object.keys(res)[0] === 'session') {

					console.log('store hit session', res);
					this.state.setState('session', this._store);
				}
			} else {
				for (let cat of res) {
					for (let key of Object.keys[cat])
						this.state.setState(key, this._store);
				}
			}
		});

	//todo INIT Chain
	this.initializeUserState()
		.then(user => {
			this._store.dispatch({
				type: 'USER_LOGGED_IN',
				payload: user
			});
			this.state.setState('user', this._store);
			this.socketService.responseSocket('comapanies.get', {}).subscribe(res => {
				this.wstService.setTWTProp(Object.assign(this.wst, {crm: {companies: res}}));
				this.socketService.responseSocket('contacts.get', {}).subscribe(contacts => {
					this.socketService.responseSocket('notes.get', {}).subscribe(res => {
						this.wstService.setTWTProp(Object.assign(this.wst, {crm: {companies: res}}));
						this.socketService.responseSocket('quotes.get', {}).subscribe(contacts => {

						})
					});
				})
			});
			//todo init Forms and Lists
			//todo fix: reversed state and event
			this.state.setState('session', this._store);
		});
	}

	// private buildListAndFormData(models): void{
	// 	console.log('crm hit', models);
	// 	for (let key of models){
	// 		console.log('crm', models[models.key]);
	// 		const payload = this.formsService.ListBuilder(models[models.key]);
	// 		this._store.dispatch({type: 'FORM_LIST_BUILD', payload: payload});
	// 	}
	// }

	// private initializeCRMTypes(socketService: SocketService, endPoints: string[]): Promise<CRMType[]> {
	// 	return new Promise((resolve) => {
	// 		let responses = [];
	// 		for(let endPoint of endPoints){
	// 			socketService.responseSocket(endPoint, {}).subscribe(response => {
	// 				const action: string = endPoint.split('.')[0].toUpperCase().concat('_GET');
	// 				console.log('action',action);
	// 				this._store.dispatch({type: action, payload: {updated: action.toLowerCase().split('_')[0], [action.split('_')[0].toLowerCase()]: response}})
	// 				this.state.setState('crm', this._store);
	// 				// this.wstService.setTWTProp({listItems:this.formsService.ListBuilder(response)});
	// 				// responses.push(response);
	// 			});
	// 		}
	// 		resolve(responses);
	// 	}).catch(err => this.toastr.error('Oh No! There was an error getting data.  ' + err))
	// }

	private initializeUserState(): Promise<User> {
		//todo login or register
		return new Promise((resolve, reject) => {
			this.userServices.getCurrentUserData(FIXTURE_USER_ID)
				.subscribe((user: User) => {
					resolve(user);
				}, error => reject(error))
		})
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
		switch (event.type) {
			case('SIDE_MENU_TOGGLE'):
				this._store.dispatch({type: event.type, payload: event.payload});
				break;
			case('CREATE_CONTEXT'):
				this._store.dispatch({type: event.type, payload: event.payload});
				break;
		}
	}
}


