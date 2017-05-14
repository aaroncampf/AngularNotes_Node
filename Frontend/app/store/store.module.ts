import {NgModule} from '@angular/core';
import {SessionReducer} from './reducers/session.reducer';

const COMPONENTS = [

];

const MODULES = [

]

@NgModule({
	declarations: [
		COMPONENTS
	],
	providers: [
		SessionReducer
	],
	imports: [
		MODULES
	],
	exports: [
		COMPONENTS
	]
})

export class StoreModule {}