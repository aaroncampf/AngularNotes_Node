import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import {RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DataShareService} from './services/data-share.service';
import {QuoteService} from './services/quotes.service';
import {CompanyService} from './services/companies.service';
import {ContactService} from './services/contact.service';
import {NotesService} from './services/notes.service';
import {InputComponent} from './components/input.component';
import {MainComponent} from './main/main.component';
import {SidePanelCompoennt} from './components/side-panel.component';
import {QuotesComponent} from './components/quotes.component';
import {Quotes_Printout} from './components/quote_printout.component';
import {NotesComponent} from './components/notes.component';
import {ContactDetailsComponent} from './components/contact-details.component';
import {CompanyDetailsComponent} from './components/company-details.component';
import {ToastModule} from 'ng2-toastr';

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
		CompanyService,
		ContactService,
		NotesService,
		QuoteService,
		DataShareService,
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	bootstrap: [ MainComponent ]
})

export class AppModule {}
