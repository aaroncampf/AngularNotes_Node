import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import {RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'ng2-toastr';
import {DataShareService} from './global/data-share.service';
import {InputComponent} from './components/input.component';
import {MainComponent} from './main/main.component';
import {SidePanelComponent} from './main/side-panel.component';
import {SettingsComponent} from './users/settings.component';
import {SocketService} from './global/socket.service';
import {AuthService} from './global/authorization.service';
import {UserModule} from './users/users.module'
import {CompaniesModule} from './companies/companies.module';
import {ContactsModule} from './contacts/contacts.module';
import {QuotesModule} from './quotes/quotes.module';
import {NotesModule} from './notes/notes.module';

const MAIN_ROUTES: Routes = [
	// {path: ''}
	{path:'user', loadChildren: "./users/users.module#UsersModule"},
	{path:'quotes', loadChildren: "./quotes/quotes.module#QuotessModule"},
	{path:'notes', loadChildren: "./notes/notes.module#NotessModule"},
	{path:'companies', loadChildren: "./companies/companies.module#CompanyModule"},
	{path:'settings', component: SettingsComponent},
	{path:'', redirectTo: '/users/my-account', pathMatch: 'full'},
	// {path: '**', component: '/user/my-account'}
];

@NgModule({
	declarations: [
		MainComponent,
		SidePanelComponent,
		InputComponent,
		SettingsComponent,
	],
	imports: [
		QuotesModule,
		NotesModule,
		UserModule,
		CompaniesModule,
		ContactsModule,
		NoopAnimationsModule,
		BrowserAnimationsModule,
		ToastModule.forRoot(),
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		RouterModule.forRoot(MAIN_ROUTES),
	],
	providers: [
		DataShareService,
		SocketService,
		AuthService,
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	bootstrap: [MainComponent],
})

export class CRMModule {}
