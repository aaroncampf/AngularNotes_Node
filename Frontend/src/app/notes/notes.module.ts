import {NgModule} from '@angular/core';
import {NotesComponent} from './notes.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule as AngularComonModule} from '@angular/common';
import {GlobalModule} from '../global/global.module';

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
		GlobalModule,
		RouterModule.forChild(ROUTES)
	],
	exports: [
		NotesComponent
	]

})

export class NotesModule {}