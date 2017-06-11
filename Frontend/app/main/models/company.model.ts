import {Contact} from './contact.model';
import {Quote} from './quote.model';

export interface Company {
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
	quotes: Quote[];
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
		quotes: [],
		modelType: 'companies',
		singular: 'Company'
	}
}