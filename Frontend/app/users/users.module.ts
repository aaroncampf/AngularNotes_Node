import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyAccountComponent} from './my-account.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {UsersService} from './users.services';
import {DynamicFormModule} from '../forms/dynamic-forms.module';

const components = [
	MyAccountComponent,
];

const ROUTES: Routes = [
	{path: 'my-account', component: MyAccountComponent},
];

@NgModule({
	declarations: [
		components
	],
	imports: [
		DynamicFormModule,
		SharedModule,
		CommonModule,
		RouterModule.forChild(ROUTES)
	],
	exports: [
		components
	],
	providers: [
		UsersService
	]


})

export class UsersModule {}