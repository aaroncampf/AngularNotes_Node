import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {ContactsComponent} from './contacts.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '../common/common.module';

const ROUTES: Routes = [
	{path: '', component: ContactsComponent}
];

@NgModule({
	declarations: [
		ContactsComponent
	],
	providers: [
	],
	imports: [
		AngularCommonModule,
		CommonModule,
		RouterModule.forChild(ROUTES)
	],
	exports: [
		ContactsComponent
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]

})

export class ContactsModule {}