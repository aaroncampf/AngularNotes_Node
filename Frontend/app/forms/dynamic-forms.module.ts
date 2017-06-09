import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ListComponent} from './components/list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from './components/input.component';
import {FormComponent} from './components/form.component';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsService} from './services/forms.service';
import {HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {SharedModule} from '../shared/shared.module';
import {TextareaUndoComponent} from './components/textarea-undo.component';
import {SingleLineTextInputComponent} from './components/single-line-text-input.component';

const ROUTES: Routes = [
];

const COMPONENTS = [
	ListComponent,
	InputComponent,
	FormComponent,
	TextareaUndoComponent,
	SingleLineTextInputComponent
];

const MODULES = [
	SharedModule,
	CommonModule,
	FormsModule,
	ReactiveFormsModule,
	RouterModule.forChild(ROUTES)
];

@NgModule({
	declarations: [
		COMPONENTS
	],
	imports: [
		MODULES,
	],
	exports: [
		COMPONENTS
	],
	providers: [
		FormsService,
		{
			provide: HAMMER_GESTURE_CONFIG,
			useClass: HammerGestureConfig
		},
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA,
	]

})

export class DynamicFormsModule {

}