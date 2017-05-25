import {Injectable} from '@angular/core';
import {StateService} from '../../store/service/state.service';
import {FormsService} from '../../forms/services/forms.service';
import {FormGroup} from '@angular/forms';
import * as _ from 'lodash';

@Injectable()
export class UIService {
	constructor(private stateService: StateService, private forms: FormsService){}
	// public initSideMenu(): Promise<any> {
	// 	return new Promise((resolve) => {
	// 		this.stateService.dispatch('SERVICE_COMPANIES_GET', {}).then(companies => {
	// 			this.stateService.dispatch('STATE_SERVICE_SUCCESS', {loading: false});
	// 			this.stateService.dispatch('CACHE_COMPANIES', {companies: companies});
	// 			resolve();
	// 		}).then(() => {
	// 			this.stateService.dispatch('SERVICE_CONTACTS_GET', {})
	// 				.then(contacts => {
	// 					this.stateService.dispatch('STATE_SERVICE_SUCCESS', {loading: false});
	// 					this.stateService.dispatch('CACHE_CONTACTS', {contacts: contacts});
	// 					resolve();
	// 			}).catch(() => {
	// 					this.stateService.dispatch('SET_UI_SERVICE_ERROR', {loading: false});
	// 			});
	// 		});
	// 	});
	// }

	public contactsListUpdate(): void {
		this.stateService.dispatch('STATE_CONTACTS_LOADING', {contactsListReady: false});
		this.stateService.dispatch('SERVICE_CONTACTS_GET', {}).then(contacts => {
			this.forms.ListBuilder(contacts).then(list => {
				_.merge(list, {form: new FormGroup(list.controls)});
				this.stateService.dispatch('CACHE_CONTACTS_LIST', {contactsList: list}).then(() => {
					this.stateService.dispatch('STATE_CACHE_CONTACTS-LIST_SUCCESS', {
						contactsListReady: true,
					});
					this.stateService.dispatch('STATE_SIDE_MENU_INIT_SUCCESS', {
						sideMenuReady: true,
						loading: false
					});
				});
			});
		});
	}

	public companiesListUpdate(): void {
		this.stateService.dispatch('STATE_COMPANIES_LOADING', {companiesListReady: false});
		this.stateService.dispatch('SERVICE_COMPANIES_GET', {}).then(companies => {
			this.forms.ListBuilder(companies).then(list => {
				_.merge(list, {form: new FormGroup(list.controls)});
				this.stateService.dispatch('CACHE_COMPANIES_LIST', {companiesList: list}).then(() => {
					this.stateService.dispatch('STATE_CACHE_COMPANIES-LIST_SUCCESS', {
						companiesListReady: true,
					});
					this.stateService.dispatch('STATE_SIDE_MENU_INIT_SUCCESS', {
						sideMenuReady: true,
						loading: false
					});
				});
			});
		});
	}

}