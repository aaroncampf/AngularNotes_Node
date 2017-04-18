import {NgModule} from '@angular/core';
import {CompaniesComponent} from './companies.component';
import {CompanyService} from './companies.service';
import {RouterModule, Routes} from '@angular/router';

const ROUTES: Routes = [
	{path: 'company', component: CompaniesComponent}
];

@NgModule({
	declarations: [
		CompaniesComponent
	],
	providers: [
		CompanyService
	],
	imports: [
		RouterModule.forChild(ROUTES)
	],
	exports: [
		CompaniesComponent
	]

})

export class CompaniesModule {}