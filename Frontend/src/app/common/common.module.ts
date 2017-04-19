import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from './components/input.component';
import {SocketService} from './services/socket.service';
import {FormCreateComponent} from './components/form-create.component';
import {ListComponent} from './components/list.component';
import {RESTService} from './services/rest.service';
import {FormDetailsComponent} from './components/form-details.component';

const COMPONENTS = [
	InputComponent,
	FormCreateComponent,
	ListComponent,
	FormDetailsComponent,
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
		RESTService
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	exports: [
		COMPONENTS
	]

})

export class CommonModule {}