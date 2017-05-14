import {CRMType} from '../main/models/crm-models.type';
import {QuestionBase} from '../forms/base-question.class';
import {FormControl} from '@angular/forms';
import {CRMStore} from '../crm.module';
import {Company} from '../main/models/company.model';
import {Note} from '../main/models/note.model';
import {Quote} from '../main/models/quote.model';
import {Contact} from '../main/models/contact.model';
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
