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

const MAIN_ROUTES: Routes = [
	{path: '', children: [
		{path:':tab', component: HomeComponent },
		{path:'', redirectTo: 'contacts', pathMatch: 'full'}
	]}];

@NgModule({
	declarations: [
		MainComponent,
		HomeComponent,
		ContactsComponent,
		QuotesComponent,
		InputComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		RouterModule.forRoot(MAIN_ROUTES)
	],
	providers: [
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	bootstrap: [ MainComponent ]
})

export class AppModule {}
