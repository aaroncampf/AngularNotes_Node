import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ListComponent} from './components/list.component';
import {InputComponent} from './components/input.component';
import {HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {QuestionService} from './services/question.service';
import {FormComponent} from './components/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SmartFormComponent} from './components/smart-form.component';

const COMPONENTS = [
	ListComponent,
	InputComponent,
	FormComponent,
	SmartFormComponent
];

const MODULES = [
	CommonModule,
	FormsModule,
	ReactiveFormsModule,
	RouterModule
];

@NgModule({
	declarations: [
		COMPONENTS

	],
	imports: [
		MODULES
	],
	exports: [
		COMPONENTS
	],
	providers: [
		QuestionService,
		{
			provide: HAMMER_GESTURE_CONFIG,
			useClass: HammerGestureConfig
		},
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA,
	]

})

export class DynamicFormModule {

}