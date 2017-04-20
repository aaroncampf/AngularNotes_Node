import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from './components/input.component';
import {SocketService} from './services/socket.service';
import {ListComponent} from './components/list.component';
import {RESTService} from './services/rest.service';
import {OperationsService} from './services/operations.service';

const COMPONENTS = [
	InputComponent,
	ListComponent,
];

@NgModule({
	declarations: [
		COMPONENTS
	],
	imports: [
		AngularCommonModule,
		ReactiveFormsModule,
		FormsModule
	],
	providers: [
		SocketService,
		RESTService,
		OperationsService
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	exports: [
		COMPONENTS
	]

})

export class GlobalModule {}