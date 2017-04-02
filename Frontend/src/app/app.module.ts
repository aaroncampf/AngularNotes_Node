import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import {RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'ng2-toastr';
import {DataShareService} from './services/data-share.service';
import {QuoteService} from './services/quotes.service';
import {CompanyService} from './services/companies.service';
import {ContactService} from './services/contact.service';
import {NotesService} from './services/notes.service';
import {InputComponent} from './components/input.component';
import {MainComponent} from './main/main.component';
import {SidePanelComponent} from './components/side-panel.component';
import {QuotesComponent} from './components/quotes.component';
import {Quotes_Printout} from './components/quote_printout.component';
import {NotesComponent} from './components/notes.component';
import {ContactDetailsComponent} from './components/contact-details.component';
import {CompanyDetailsComponent} from './components/company-details.component';
import {QuoteDetailsComponent} from './components/quote-details.component';
import {SettingsComponent} from './components/settings.component';
import {UserService} from './services/user.service';
import {QuoteListComponent} from './components/quote-lines-list.component';
import {SocketService} from './services/socket.service';

const MAIN_ROUTES: Routes = [
	{path: '', children: [
		{path:'settings', component: SettingsComponent},
		{path:'company', component: CompanyDetailsComponent},
		{path:'contact', component: ContactDetailsComponent},
		{path:'quotes', component: QuotesComponent},
		{path:'quote-print', component: Quotes_Printout},
		{path:'quote-details', component: QuoteDetailsComponent},
		{path:'notes', component: NotesComponent},
		{path:'', redirectTo: '/company', pathMatch: 'full'}
	]},
];

@NgModule({
	declarations: [
		MainComponent,
		QuoteDetailsComponent,
		SidePanelComponent,
		ContactDetailsComponent,
		QuotesComponent,
		Quotes_Printout,
		InputComponent,
		NotesComponent,
		CompanyDetailsComponent,
		SettingsComponent,
		QuoteListComponent
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
		UserService,
		SocketService
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	bootstrap: [ MainComponent ]
})

export class AppModule {}
