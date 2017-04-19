import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'ng2-toastr';
import {DataShareService} from './common/services/data-share.service';
import {MainComponent} from './main/main.component';
import {NavigationComponent} from './main/navigation.component';
import {DashboardComponent} from './main/dashboard.component';
import {UserModule} from './users/users.module'
import {CompaniesModule} from './companies/companies.module';
import {ContactsModule} from './contacts/contacts.module';
import {QuotesModule} from './quotes/quotes.module';
import {NotesModule} from './notes/notes.module';
import {CommonModule} from './common/common.module';

const MAIN_ROUTES: Routes = [
	// {path: ''}
	{path:'user', loadChildren: "./users/users.module#UsersModule"},
	{path:'contacts', loadChildren: "./contacts/contacts.module#ContactsModule"},
	{path:'quotes', loadChildren: "./quotes/quotes.module#QuotesModule"},
	{path:'notes', loadChildren: "./notes/notes.module#NotesModule"},
	{path:'companies', loadChildren: "./companies/companies.module#CompaniesModule"},
	// {path:'settings', component: SettingsComponent},
	{path:'dashboard', component: MainComponent},
	{path:'', redirectTo: '/dashboard', pathMatch: 'full'},
	// {path: '**', component: '/user/my-account'}
];

const MODULES = [
		NoopAnimationsModule,
		BrowserAnimationsModule,
		AngularCommonModule,
		BrowserModule,
		HttpModule,
		RouterModule.forRoot(MAIN_ROUTES, {useHash: false}),
		ToastModule.forRoot(),
		UserModule,
		QuotesModule,
		NotesModule,
		ContactsModule,
		CommonModule,
		CompaniesModule,
];

@NgModule({
	declarations: [
		MainComponent,
		NavigationComponent,
		DashboardComponent
	],
	imports: [
		MODULES
	],
	providers: [
		DataShareService,
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	exports: [

	],
	bootstrap: [MainComponent]
})

export class CRMModule {}
