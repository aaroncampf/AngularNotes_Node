import {NgModule} from '@angular/core';
import {StateService} from './service/state.service';
import {crmReducer, userReducer, engagementsReducer} from './reducers/action.reducer';
import {StoreModule as NGStoreModule} from '@ngrx/store';

@NgModule({
	declarations: [

	],
	providers: [
		StateService,
	],
	imports: [
		NGStoreModule.provideStore({
			'crm': crmReducer,
			'user': userReducer,
			'engagements': engagementsReducer
		})
	],
	exports: [
	]
})

export class CRMStoreModule {}