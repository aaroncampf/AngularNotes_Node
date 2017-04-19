import {NgModule} from '@angular/core';
import {NotesComponent} from './notes.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule as AngularComonModule} from '@angular/common';
import {CommonModule} from '../common/common.module';

const ROUTES: Routes = [
	{path: '', component: NotesComponent}
];

@NgModule({
	declarations: [
		NotesComponent
	],
	providers: [
	],
	imports: [
		AngularComonModule,
		CommonModule,
		RouterModule.forChild(ROUTES)
	],
	exports: [
		NotesComponent
	]

})

export class NotesModule {}