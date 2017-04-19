import {NgModule} from '@angular/core';
import {QuotesComponent} from './quotes.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '../common/common.module';
import {CommonModule as AngularCommonModule} from '@angular/common';

const ROUTES: Routes = [
	{path: '', component: QuotesComponent}
];

@NgModule({
	declarations: [
		QuotesComponent
	],
	providers: [
	],
	imports: [
		AngularCommonModule,
		CommonModule,
		RouterModule.forChild(ROUTES)
	],
	exports: [
		QuotesComponent
	]

})

export class QuotesModule {}