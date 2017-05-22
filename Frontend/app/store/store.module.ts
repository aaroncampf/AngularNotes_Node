import {NgModule} from '@angular/core';
import {StateService} from './service/state.service';

@NgModule({
	providers: [
		StateService,
	],
})

export class StoreModule {}