import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SocketService} from './services/socket.service';
import {RESTService} from './services/rest.service';
import {UsersService} from '../users/users.services';
import {ToTitleCaseKeys} from './pipes/toTitleCase.pipe';
import {DiamondLoaderComponent} from './animations/loading-screen.animation';
import {ModelService} from './services/model.service';

const COMPONENTS = [
	DiamondLoaderComponent,
];

const MODULES = [
	AngularCommonModule,
	ReactiveFormsModule,
	FormsModule,
];

@NgModule({
	declarations: [
		COMPONENTS
	],
	imports: [
		MODULES
	],
	providers: [
		ToTitleCaseKeys,
		SocketService,
		RESTService,
		UsersService,
		ModelService,
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	exports: [
		COMPONENTS
	]
})

export class SharedModule {}