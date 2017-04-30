import {CRMType} from '../shared/models/CRMTypes.type';
import {Company} from '../shared/models/company.model';
import {Contact} from '../shared/models/contact.model';
import {Note} from '../shared/models/note.model';
import {Quote} from '../shared/models/quote.model';

export interface TWT extends User {
	selectedRelations?: {
		company?: {};
		quotes?: {}[];
		contacts?: {
			contact?: {},
			notes?: {}[]
		}[],
	},
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
