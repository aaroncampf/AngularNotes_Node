import {NgModule} from '@angular/core';
import {NotesComponent} from './notes.component';
import {NotesService} from './notes.service';
import {RouterModule, Routes} from '@angular/router';

const ROUTES: Routes = [
	{path: 'company', component: NotesComponent}
];

@NgModule({
	declarations: [
		NotesComponent
	],
	providers: [
		NotesService
	],
	imports: [
		RouterModule.forChild(ROUTES)
	],
	exports: [
		NotesComponent
	]

})

export class NotesModule {}