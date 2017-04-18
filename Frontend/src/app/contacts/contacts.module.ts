import {NgModule} from '@angular/core';
import {ContactsComponent} from './contacts.component';
import {ContactsService} from './contacts.service';
import {RouterModule, Routes} from '@angular/router';

const ROUTES: Routes = [
	{path: 'company', component: ContactsComponent}
];

@NgModule({
	declarations: [
		ContactsComponent
	],
	providers: [
		ContactsService
	],
	imports: [
		RouterModule.forChild(ROUTES)
	],
	exports: [
		ContactsComponent
	]

})

export class ContactsModule {}