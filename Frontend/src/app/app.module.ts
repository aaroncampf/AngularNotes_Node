import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import {RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MainComponent} from './main/main.component';
import {HomeComponent} from './components/home.component';
import {ContactsComponent} from './components/contacts.component';
import {QuotesComponent} from './components/quotes.component';
import {InputComponent} from './components/input.component';
import {CompanyService} from './services/companies.service';
import {CompaniesComponent} from './components/companies.component';
import {ContactService} from './services/contact.service';
import {ModalModule} from 'angular2-modal';
import {BootstrapModalModule} from 'angular2-modal/plugins/bootstrap';
import {Quotes_Printout} from './components/quote_printout.component';



const MAIN_ROUTES: Routes = [
	{path: '', children: [
		{path:':tab', component: HomeComponent },
		{path:'', redirectTo: 'companies', pathMatch: 'full'}
	]}];

@NgModule({
	declarations: [
		MainComponent,
		HomeComponent,
		ContactsComponent,
		QuotesComponent,
		Quotes_Printout,
		InputComponent,
		CompaniesComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		ModalModule.forRoot(),
		BootstrapModalModule,
		RouterModule.forRoot(MAIN_ROUTES)
	],
	providers: [
		CompanyService,
		ContactService
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	bootstrap: [ MainComponent ]
})

export class AppModule {}
