import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyAccountComponent} from './my-account.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {UsersService} from './users.services';
import {DynamicFormsModule} from '../forms/dynamic-forms.module';

const COMPONENTS = [
	MyAccountComponent,
];

const ROUTES: Routes = [
	{path: 'my-account', component: MyAccountComponent},
];

@NgModule({
	declarations: [
		COMPONENTS
	],
	imports: [
		DynamicFormsModule,
		SharedModule,
		CommonModule,
		RouterModule.forChild(ROUTES)
	],
	exports: [
		COMPONENTS
	],
	providers: [
		UsersService
	]


})

export class UsersModule {}