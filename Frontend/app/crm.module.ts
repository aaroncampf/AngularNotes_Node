import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {ToastModule} from 'ng2-toastr';
import {MainComponent} from './main/main.component';
import {NavigationComponent} from './main/navigation.component';
import {DashboardComponent} from './main/dashboard.component';
import {NotFoundComponent} from './main/not-found.component';
import {UserModule} from './users/users.module'
import {CompaniesModule} from './companies/companies.module';
import {ContactsModule} from './contacts/contacts.module';
import {QuotesModule} from './quotes/quotes.module';
import {NotesModule} from './notes/notes.module';
import {GlobalModule} from './global/global.module';


const MAIN_ROUTES: Routes = [
	{path:'user', loadChildren: "./users/users.module#UsersModule"},
	{path:'contacts', loadChildren: "./contacts/contacts.module#ContactsModule"},
	{path:'quotes', loadChildren: "./quotes/quotes.module#QuotesModule"},
	{path:'notes', loadChildren: "./notes/notes.module#NotesModule"},
	{path:'companies', loadChildren: "./companies/companies.module#CompaniesModule"},
	{path:'dashboard', component: MainComponent},
	{path:'', redirectTo: '/dashboard', pathMatch: 'full'},
	{path: '**', component: NotFoundComponent}
];

const MODULES = [
		AngularCommonModule,
		BrowserAnimationsModule,
		NoopAnimationsModule,
		BrowserModule,
		HttpModule,
		RouterModule.forRoot(MAIN_ROUTES, {useHash: false}),
		ToastModule.forRoot(),
		UserModule,
		QuotesModule,
		NotesModule,
		ContactsModule,
		GlobalModule,
		CompaniesModule,
];

const COMPONENTS = [
		MainComponent,
		NavigationComponent,
		DashboardComponent,
		NotFoundComponent
];

@NgModule({
	declarations: [
		COMPONENTS
	],
	imports: [
		MODULES
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
