import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {CompaniesComponent} from './companies.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '../common/common.module';

const ROUTES: Routes = [
	{path: '', component: CompaniesComponent}
];

@NgModule({
	declarations: [
		CompaniesComponent
	],
	providers: [
	],
	imports: [
		CommonModule,
		AngularCommonModule,
		RouterModule.forChild(ROUTES)
	],
	exports: [
		CompaniesComponent
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],

})

export class CompaniesModule {}