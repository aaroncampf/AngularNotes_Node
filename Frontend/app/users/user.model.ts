
import {CRMType} from '../global/models/CRMTypes.type';

export interface TWT extends User{
	currentSelect : {
		currentParent?: CRMType;
		currentSiblings?: {
			[siblingId: string]: CRMType[]
		};
		current: CRMType;
	};
	focus?: {
		type: string;
		mode: string;
	}
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

export function initUser(props: object): User {
	let user: User = <User>{};
	for (let key of Object.keys(props)) {
		user[key] = props[key];
	}
	return user;

}
