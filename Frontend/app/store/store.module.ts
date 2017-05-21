import {NgModule} from '@angular/core';
import {StateService} from './service/state.service';
import {reducer} from './reducers/action.reducer';
import {StoreModule as NGStoreModule} from '@ngrx/store';

@NgModule({
	declarations: [

	],
	providers: [
		StateService,
	],
	imports: [
		NGStoreModule.provideStore({
			'crm': reducer,
		})
	],
	exports: [
	]
})

export class CRMStoreModule {}