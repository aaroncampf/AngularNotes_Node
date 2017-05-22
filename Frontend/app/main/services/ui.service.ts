import {Injectable} from '@angular/core';
import {StateService} from '../../store/service/state.service';

@Injectable()
export class UIService {
	constructor(private stateService: StateService){}
	public initSideMenu(): Promise<any> {
		return new Promise((resolve) => {
			this.stateService.dispatch('SERVICE_COMPANIES_GET', {}).then(companies => {
				this.stateService.dispatch('STATE_SERVICE_SUCCESS', {loading: false});
				this.stateService.dispatch('CACHE_COMPANIES', {companies: companies});
				resolve();
			}).then(() => {
				this.stateService.dispatch('SERVICE_CONTACTS_GET', {})
					.then(contacts => {
						this.stateService.dispatch('STATE_SERVICE_SUCCESS', {loading: false});
						this.stateService.dispatch('CACHE_CONTACTS', {contacts: contacts});
						resolve();
				});
			});
		});
	}

}