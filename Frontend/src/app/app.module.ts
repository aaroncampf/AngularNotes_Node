import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import {RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MainComponent} from './main/main.component';

const MAIN_ROUTES: Routes = [
	{path: '', children: [
		{path:'', redirectTo: 'notes', pathMatch: 'full'}
	]}];

@NgModule({
	declarations: [
		MainComponent,
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
