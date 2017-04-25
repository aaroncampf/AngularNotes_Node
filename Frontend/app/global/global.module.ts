import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from './components/input.component';
import {SocketService} from './services/socket.service';
import {ListComponent} from './components/list.component';
import {RESTService} from './services/rest.service';
import {TokenService, UsersServices} from '../users/users.services';

const COMPONENTS = [
	InputComponent,
	ListComponent,
];

const MODULES = [
	AngularCommonModule,
	ReactiveFormsModule,
	FormsModule
];

@NgModule({
	declarations: [
		COMPONENTS
	],
	imports: [
		MODULES
	],
	providers: [
		SocketService,
		RESTService,
		UsersServices,
		TokenService
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	exports: [
		COMPONENTS,
		MODULES,
	]

})

export class GlobalModule {}