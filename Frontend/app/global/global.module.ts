import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from './components/input.component';
import {SocketService} from './services/socket.service';
import {ListComponent} from './components/list.component';
import {RESTService} from './services/rest.service';
import {TokenService, UsersServices} from '../users/users.services';
import {HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';

const COMPONENTS = [
	InputComponent,
	ListComponent,
];

const MODULES = [
	AngularCommonModule,
	ReactiveFormsModule,
	FormsModule
];

export class MyHammerConfig extends HammerGestureConfig {
	overrides = <any>{
		'swipe': {velocity: 0.4, threshold: 20}

	}
}

@NgModule({
	declarations: [
		COMPONENTS
	],
	imports: [
		MODULES
	],
	providers: [
		{
		provide: HAMMER_GESTURE_CONFIG,
		useClass: MyHammerConfig
	},
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