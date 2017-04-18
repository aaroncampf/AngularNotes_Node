import {NgModule} from '@angular/core';
import {MyAccountComponent} from './my-account.component';
import {SignInComponent} from './sign-in.component';
import {SignOutComponent} from './sign-out.component';
import {SignUpComponent} from './sign-up.component';
import {RouterModule, Routes} from '@angular/router';

const components = [
	MyAccountComponent,
	SignInComponent,
	SignOutComponent,
	SignUpComponent
];

const ROUTES: Routes = [
	{path: 'users', children: [
		{path: 'my-account', component: MyAccountComponent},
		{path: 'sign-in', component: SignInComponent},
		{path: 'sign-up', component: SignUpComponent},
		{path: 'sign-out', component: SignOutComponent}
	]}
];

@NgModule({
	declarations: [
		components
	],
	imports: [
		RouterModule.forChild(ROUTES)
	],
	exports: [
		components
	]


})

export class UserModule {}