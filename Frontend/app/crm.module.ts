import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {ToastModule} from 'ng2-toastr';
import {MainComponent} from './main/components/main.component';
import {MobileDashboardComponent} from './main/ui/mobile-dashboard.component';
import {NotFoundComponent} from './main/routes/not-found.component';
import {DynamicFormsModule} from './forms/dynamic-forms.module';
import {SideMenuComponent} from './main/components/side-menu.component';
import {CRMService} from './main/services/crm.service';
import {ContactComponent} from './main/components/contact-details.component';
import {QuotesComponent} from './main/components/quotes.component';
import {NotesComponent} from './main/components/notes.component';
import {BottomMenuComponent} from './main/ui/bottom-menu.component';
import * as _ from 'lodash';
import {HomeComponent} from './main/components/home.component';
import {CompaniesComponent} from './main/components/companies.component';
import {AddCompanyComponent} from './main/components/add-company.component';
import {AddContactComponent} from './main/components/add-contact.component';

const MAIN_ROUTES: Routes = [
	{path: 'main', component: MainComponent},
	{path: 'Home', component: HomeComponent},
	{path: 'Companies', component: CompaniesComponent},
	{path: 'Add-Company', component: AddCompanyComponent},
	{path: 'Add-Contact/:owner_id', component: AddContactComponent},
	{path: 'Contact-Details/:contact_id', component: ContactComponent},
	{path: 'Quotes', component: QuotesComponent},
	{path: '', redirectTo: '/Home', pathMatch: 'full'},
	{path: '**', component: NotFoundComponent}
];

const COMPONENTS = [
	HomeComponent,
	AddContactComponent,
	AddCompanyComponent,
	CompaniesComponent,
	SideMenuComponent,
	MainComponent,
	MobileDashboardComponent,
	NotFoundComponent,
	ContactComponent,
	QuotesComponent,
	NotesComponent,
	BottomMenuComponent,
];

const MODULES = [
	RouterModule.forRoot(MAIN_ROUTES),
	CommonModule,
	BrowserAnimationsModule,
	NoopAnimationsModule,
	BrowserModule,
	HttpModule,
	ToastModule.forRoot(),
	FormsModule,
	ReactiveFormsModule,
	DynamicFormsModule,
];

@NgModule({
	declarations: [
		COMPONENTS
	],
	imports: [
		MODULES,
	],
	providers: [
		CRMService,
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	exports: [
		COMPONENTS
	],
	entryComponents: [ContactComponent],
	bootstrap: [MainComponent]
})

export class CRMModule {}
