import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from './components/input.component';
import {SocketService} from './services/socket.service';
import {FormComponent} from './components/form.component';
import {ListComponent} from './components/list.component';

// const COMPONENTS: Component[] = [
//
//
// ];
//
@NgModule({
	declarations: [
		InputComponent,
		FormComponent,
		ListComponent
	],
	imports: [
		AngularCommonModule,
		ReactiveFormsModule,
		FormsModule
	],
	providers: [
		SocketService
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	exports: [
		InputComponent,
		FormComponent,
		ListComponent
	]

})

export class CommonModule {}