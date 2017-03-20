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
		InputComponent,
		CompaniesComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		RouterModule.forRoot(MAIN_ROUTES)
	],
	providers: [
		CompanyService
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	bootstrap: [ MainComponent ]
})

export class AppModule {}
