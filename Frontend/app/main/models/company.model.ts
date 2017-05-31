import {_baseListItem} from './base-model.model';
import {Contact} from './contact.model';

export interface Company extends _baseListItem{
	id?: string
	name: string;
	addressOne: string;
	addressTwo: string;
	city: string;
	zip: string;
	phone: string;
	web: string;
	misc: string;
	fax: string;
	contacts: Contact[];
	modelType: 'companies';
	singular: 'Company';

}


export function newCompany(): Company {
		return {
			id: null,
			name: null,
			addressOne: null,
			addressTwo: null,
			city: null,
			zip: null,
			phone: null,
			web: null,
			misc: null,
			fax: null,
			contacts: [],
			modelType: 'companies',
			singular: 'Company'
		}
}