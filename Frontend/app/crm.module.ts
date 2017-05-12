import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {ToastModule} from 'ng2-toastr';
import {MainComponent} from './main/main.component';
import {MobileNavigationComponent} from './main/ui/m-navigation.component';
import {MDashboardComponent} from './main/ui/dashboard.component';
import {NotFoundComponent} from './main/routes/not-found.component';
import {UsersModule} from './users/users.module'
import {SharedModule} from './shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {ViewEditComponent} from './main/view.component';
import {DynamicFormsModule} from './forms/dynamic-forms.module';
import {HomeComponent} from './main/ui/home.component';
import {SideMenuComponent} from './main/ui/side-menu.component';
import {CRMMViewComponent} from './main/crm-m-view.component';

const MAIN_ROUTES: Routes = [
	{path:'user', loadChildren: "./users/users.module#UsersModule"},
	{path:'forms', loadChildren: "./forms/dynamic-forms.module#DynamicFormsModule"},
	{path:'main', component: HomeComponent},
	{path:'crm', component: CRMMViewComponent},
	{path:'', redirectTo: '/main', pathMatch: 'full'},
	{path: '**', component: NotFoundComponent}
];

const MODULES = [
	RouterModule.forRoot(MAIN_ROUTES),
	CommonModule,
	BrowserAnimationsModule,
	NoopAnimationsModule,
	BrowserModule,
	HttpModule,
	ToastModule.forRoot(),
	UsersModule,
	SharedModule,
	DynamicFormsModule
];
const COMPONENTS = [
	CRMMViewComponent,
	SideMenuComponent,
	HomeComponent,
	ViewEditComponent,
	MainComponent,
	MobileNavigationComponent,
	MDashboardComponent,
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
