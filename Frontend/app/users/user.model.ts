import {CRMType} from '../shared/models/crm-models.type';
import {QuestionBase} from '../forms/base-question.class';
import {FormControl} from '@angular/forms';

export interface TWT {
	listItems?: any[];
	subListGroups?: ListGroup[];
	viewContext?: string;
	viewMode?: string;
	selected?: CRMType;
	questions?: QuestionBase<any>[];
	controls?: {[name: string]: FormControl};
}

export interface ListGroup {
	name: string;
	list: any[];
}

export interface User extends _User {
	id?: string;
	firstName?: string;
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
