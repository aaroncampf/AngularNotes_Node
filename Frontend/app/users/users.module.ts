import {NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {MyAccountComponent} from './my-account.component';
import {RouterModule, Routes} from '@angular/router';
import {GlobalModule} from '../global/global.module';
import {UsersServices} from './users.services';

const components = [
	MyAccountComponent,
];

const ROUTES: Routes = [
	{path: '', children: [
		{path: 'my-account', component: MyAccountComponent},
	]}
];

@NgModule({
	declarations: [
		components
	],
	imports: [
		GlobalModule,
		AngularCommonModule,
		RouterModule.forChild(ROUTES)
	],
	exports: [
		components
	],
	providers: [
		UsersServices
	]


})

export class UserModule {}