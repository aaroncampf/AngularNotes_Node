import {NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {MyAccountComponent} from './my-account.component';
import {SignInComponent} from './sign-in.component';
import {SignOutComponent} from './sign-out.component';
import {SignUpComponent} from './sign-up.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '../common/common.module';

const components = [
	MyAccountComponent,
	// SignInComponent,
	// SignOutComponent,
	// SignUpComponent,
];

const ROUTES: Routes = [
	{path: '', children: [
		{path: 'my-account', component: MyAccountComponent},
		// {path: 'sign-in', component: SignInComponent},
		// {path: 'sign-up', component: SignUpComponent},
		// {path: 'sign-out', component: SignOutComponent}
	]}
];

@NgModule({
	declarations: [
		components
	],
	imports: [
		CommonModule,
		AngularCommonModule,
		RouterModule.forChild(ROUTES)
	],
	exports: [
		components
	]


})

export class UserModule {}