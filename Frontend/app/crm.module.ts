import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {ToastModule} from 'ng2-toastr';
import {MainComponent} from './main/main.component';
import {MobileNavigationComponent} from './main/ui/mobile/m-navigation.component';
import {MobileDashboardComponent} from './main/ui/mobile-dashboard.component';
import {NotFoundComponent} from './main/routes/not-found.component';
import {UsersModule} from './users/users.module'
import {SharedModule} from './shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {DynamicFormsModule} from './forms/dynamic-forms.module';
import {HomeComponent} from './main/ui/home.component';
import {SideMenuComponent} from './main/ui/mobile/side-menu.component';
import {StoreModule} from '@ngrx/store';
import {SessionReducer} from './store/reducers/session.reducer';
import {CRMType} from './main/models/crm-models.type';
import {UserReducer} from './store/reducers/user.reducer';
import {CRMReducer} from './store/reducers/crm.reducer';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StateProjections} from './store/reducers/state.projector';
import {WritableStateTokenService} from './store/state-token/wst.service';

const MAIN_ROUTES: Routes = [
	{path:'main', component: HomeComponent},
	{path:'', redirectTo: '/main', pathMatch: 'full'},
	{path: 'user', redirectTo: '/main', pathMatch: 'full'},
	{path:'user', loadChildren: "./users/users.module#UsersModule"},
	{path:'forms', loadChildren: "./forms/dynamic-forms.module#DynamicFormsModule"},
	{path: '**', component: NotFoundComponent}
];
const SESSION_REDUCER = new SessionReducer().sessionReducer;

const MODULES = [
	StoreModule,
	RouterModule.forRoot(MAIN_ROUTES),
	CommonModule,
	BrowserAnimationsModule,
	NoopAnimationsModule,
	BrowserModule,
	HttpModule,
	ToastModule.forRoot(),
	UsersModule,
	SharedModule,
	FormsModule,
	ReactiveFormsModule,
	DynamicFormsModule,
	StoreModule.provideStore({
			'session': SESSION_REDUCER,
			'user':UserReducer,
			"crm": CRMReducer,
	})
];

export interface CRMStore {
	crm?: {
		[index:number]:CRMType[];
		key: string;
	}[];
	user?: {};
	session?: {
		selected: CRMType;
		formContext: string;
		sideMenu: {
			toggle: number;
			toggled: boolean;
		},
		bottomMenu: {
			toggle: number;
			toggled: boolean;
		},
		listItems: {
			items: {}[]
			questions: {}[],
			controls: {[name: string]: FormControl}
		}
	}
}

const COMPONENTS = [
	SideMenuComponent,
	HomeComponent,
	MainComponent,
	MobileNavigationComponent,
	MobileDashboardComponent,
	NotFoundComponent,
];

@NgModule({
	declarations: [
		COMPONENTS
	],
	imports: [
		MODULES,
	],
	providers: [
		WritableStateTokenService,
		StateProjections
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	exports: [
		COMPONENTS
	],
	bootstrap: [MainComponent]
})

export class CRMModule {}
