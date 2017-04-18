import {NgModule} from '@angular/core';
import {QuotesComponent} from './quotes.component';
import {QuotesService} from './quotes.service';
import {RouterModule, Routes} from '@angular/router';

const ROUTES: Routes = [
	{path: 'company', component: QuotesComponent}
];

@NgModule({
	declarations: [
		QuotesComponent
	],
	providers: [
		QuotesService
	],
	imports: [
		RouterModule.forChild(ROUTES)
	],
	exports: [
		QuotesComponent
	]

})

export class QuotesModule {}