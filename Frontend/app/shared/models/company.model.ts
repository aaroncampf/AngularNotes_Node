import {CRMType} from './crm-models.type';
export interface Company {
	id: string
	name: string;
	addressOne: string;
	addressTwo: string;
	city: string;
	zip: string;
	phone: string;
	web: string;
	misc: string;
	fax: string;
	modelType: 'company'
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
			modelType: 'company'
		}
}