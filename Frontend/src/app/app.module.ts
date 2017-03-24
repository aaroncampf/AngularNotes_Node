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
import {NotesComponent} from './components/notes.component';
import {NotesService} from './services/notes.service';
import {CreateCompanyComponent} from './components/create-company.component';
import {CreateContactComponent} from './components/create-contacts.component';
import {EditContactComponent} from './components/edit-contact.component';
import {QuoteService} from './services/quotes.service';

const MAIN_ROUTES: Routes = [
	{path: '', children: [
		{path:'create-company', component: CreateCompanyComponent},
		{path:'create-contact/:companyId', component: CreateContactComponent},
		{path:'edit-contact/:id', component: EditContactComponent},
		// {path:'edit-company/:id', component: CreateContactComponent},
		{path:':tab/:id', component: HomeComponent},
		{path:'', redirectTo: 'companies/main', pathMatch: 'full'}
	]}];

@NgModule({
	declarations: [
		MainComponent,
		HomeComponent,
		ContactsComponent,
		QuotesComponent,
		Quotes_Printout,
		InputComponent,
		CompaniesComponent,
		NotesComponent,
		CreateCompanyComponent,
		CreateContactComponent,
		EditContactComponent
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
		ContactService,
		NotesService,
		QuoteService
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	bootstrap: [ MainComponent ]
})

export class AppModule {}
