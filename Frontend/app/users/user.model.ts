import {CRMType} from '../shared/models/CRMTypes.type';
import {Quote} from '../quotes/quote.model';
import {Note} from '../notes/note.model';
import {Company} from '../companies/company.model';
import {Contact} from '../contacts/contact.model';

export interface TWT extends User {
	selectedRelates: {
		company: Company;
		contacts: {
			contact: Contact,
			notes: Note
		}[];
		quotes: Quote[];
	};
	selected: CRMType;
}

export interface User extends _User {
	id: string;
	firstName: string;
	lastName?: string;
	email: string;
	addressOne?: string;
	addressTwo?: string;
	phone?: string;
	businessWeb?: string;
	businessName?: string;
	businessPhone?: string;
	businessFax?: string;
	type: 'user';
}

export interface _User {
	role: 'admin' | 'general' | 'blocked' | 'removed';
}

//todo SET relative selectedState data

export function initUser(props: object): User {
	let user: User = <User>{};
	for (let key of Object.keys(props)) {
		user[key] = props[key];
	}
	return user;

}
