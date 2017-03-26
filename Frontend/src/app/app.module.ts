import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import {RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MainComponent} from './main/main.component';
import {QuotesComponent} from './components/quotes.component';
import {InputComponent} from './components/input.component';
import {CompanyService} from './services/companies.service';
import {ContactService} from './services/contact.service';
import {Quotes_Printout} from './components/quote_printout.component';
import {NotesComponent} from './components/notes.component';
import {NotesService} from './services/notes.service';
import {ContactDetailsComponent} from './components/contact-details.component';
import {QuoteService} from './services/quotes.service';
import {CompanyDetailsComponent} from './components/company-details.component';
import {SidePanelCompoennt} from './components/side-panel.component';
import {SelectionService} from './services/selection.service';

const MAIN_ROUTES: Routes = [
	{path: '', children: [
		{path:'company', component: CompanyDetailsComponent},
		{path:'contact', component: ContactDetailsComponent},
		{path:'quotes', component: QuotesComponent},
		{path:'notes', component: NotesComponent},
		{path:'', redirectTo: '/company', pathMatch: 'full'}
	]},
	// {path:'', redirectTo: 'angular-bros', pathMatch: 'full'}
	];

@NgModule({
	declarations: [
		MainComponent,
		SidePanelCompoennt,
		ContactDetailsComponent,
		QuotesComponent,
		Quotes_Printout,
		InputComponent,
		NotesComponent,
		CompanyDetailsComponent,

	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		RouterModule.forRoot(MAIN_ROUTES),
	],
	providers: [
		CompanyService,
		ContactService,
		NotesService,
		QuoteService,
		SelectionService
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	bootstrap: [ MainComponent ]
})

export class AppModule {}
