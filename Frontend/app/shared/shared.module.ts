import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from './components/input.component';
import {SocketService} from './services/socket.service';
import {ListComponent} from './components/list.component';
import {RESTService} from './services/rest.service';
import {UsersServices} from '../users/users.services';
import {HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {ToTitleCaseKeys} from './pipes/toTitleCase.pipe';
import {DiamondLoaderComponent} from './animations/loading-screen.animation';
import {TokenService} from './services/twt.service';

const COMPONENTS = [
	DiamondLoaderComponent,
	InputComponent,
	ListComponent,
];

const MODULES = [
	AngularCommonModule,
	ReactiveFormsModule,
	FormsModule,
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
		ToTitleCaseKeys,
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

export class SharedModule {}