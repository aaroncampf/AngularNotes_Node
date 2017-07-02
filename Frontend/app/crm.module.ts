import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {ToastModule} from 'ng2-toastr';
import {MainComponent} from './main/components/main.component';
import {DashboardComponent} from './main/components/dashboard.component';
import {NotFoundComponent} from './main/routes/not-found.component';
import {DynamicMasterFormsModule} from '../node_modules/ng-dynamic-master-forms/ng-dynamic-master-forms.module';
import {NavbarComponent} from './main/components/navbar.component';
import {CRMDataService} from './main/services/crm-data.service';
import {ContactDetailsComponent} from './main/components/contacts/contact-details.component';
import {QuotesComponent} from './main/components/quotes/quotes.component';
import {NotesComponent} from './main/components/contacts/notes.component';
import {HomeComponent} from './main/components/home.component';
import {CompaniesComponent} from './main/components/companies/companies.component';
import {AddCompanyComponent} from './main/components/companies/add-company.component';
import {AddContactComponent} from './main/components/contacts/add-contact.component';
import {ContactsComponent} from './main/components/contacts/contacts.component';
import {QuoteDetailsComponent} from './main/components/quotes/quote-details.component';
import {CompanyDetailsComponent} from './main/components/companies/companies-details.component';
import {QuoteTemplateComponent} from './main/components/quotes/template.component';
import {UserSettingsComponent} from './main/components/user/user-settings.component';
import {AddQuoteComponent} from './main/components/quotes/add-quote.component';
import {CRMStoreService} from './main/services/crm-store.service';
import {SharedModule} from './shared/shared.module';
import {EmailerService} from './main/services/emailer.service';
import {QuoteBuilderComponent} from './main/components/quote-builder.component';
import {SortByWeightPipe} from './main/pipes/sort-by-weight.pipe';

const MAIN_ROUTES: Routes = [
	{path: 'main', component: MainComponent},
	{path: 'Home', component: HomeComponent},
	{path: 'Settings', component: UserSettingsComponent},
	{path: 'Companies', component: CompaniesComponent},
	{path: 'Add-Company', component: AddCompanyComponent},
	{path: 'Company-Details', component: CompanyDetailsComponent},
	{path: 'Contacts', component: ContactsComponent},
	{path: 'Add-Contact', component: AddContactComponent},
	{path: 'Contact-Details', component: ContactDetailsComponent},
	{path: 'Add-Quote', component: AddQuoteComponent},
	{path: 'Quotes', component: QuotesComponent},
	{path: 'Build-Quote', component: QuoteBuilderComponent},
	{path: 'Quote', component: QuoteDetailsComponent},
	{path: 'Quote-Template', component: QuoteTemplateComponent},
	{path: '', redirectTo: '/Home', pathMatch: 'full'},
	{path: '**', component: NotFoundComponent}
];

const COMPONENTS = [
	QuoteBuilderComponent,
	AddQuoteComponent,
	UserSettingsComponent,
	QuoteTemplateComponent,
	ContactsComponent,
	CompanyDetailsComponent,
	QuoteDetailsComponent,
	HomeComponent,
	AddContactComponent,
	AddCompanyComponent,
	CompaniesComponent,
	NavbarComponent,
	MainComponent,
	DashboardComponent,
	NotFoundComponent,
	ContactDetailsComponent,
	QuotesComponent,
	NotesComponent,
	SortByWeightPipe
];

const MODULES = [
	RouterModule.forRoot(MAIN_ROUTES),
	CommonModule,
	BrowserAnimationsModule,
	// NoopAnimationsModule,
	BrowserModule,
	HttpModule,
	ToastModule.forRoot(),
	FormsModule,
	ReactiveFormsModule,
	DynamicMasterFormsModule,
	SharedModule,

];

@NgModule({
	declarations: [
		COMPONENTS
	],
	imports: [
		MODULES,
	],
	providers: [
		CRMDataService,
		CRMStoreService,
		EmailerService
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	exports: [
		COMPONENTS
	],
	entryComponents: [ContactDetailsComponent],
	bootstrap: [MainComponent]
})

export class CRMModule {}
