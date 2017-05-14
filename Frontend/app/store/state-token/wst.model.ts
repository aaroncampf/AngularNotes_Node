import {Company} from '../../main/models/company.model';
import {Note} from '../../main/models/note.model';
import {Quote} from '../../main/models/quote.model';
import {Contact} from '../../main/models/contact.model';
import {CRMType} from '../../main/models/crm-models.type';
import {QuestionBase} from '../../forms/base-question.class';
import {FormControl} from '@angular/forms';
import {List} from '../../forms/services/forms.service';

export const WST_INITIAL_STATE = {
	crm: {
		companies: null,
		notes: null,
		quotes: null,
		contacts: null,
	},
	user: null,
	session: {
		focus: 'companies',
		viewContext: 'main',
		viewMode: null,
		selected: null,
		details: false,
		sideMenu: false,
	},
	forms: {
		listItems: <List>{},
		questions: null,
		controls: null,
	}
};

export interface WST {
	crm?: {
		companies:Company[];
		notes: Note[];
		quotes: Quote[];
		contacts: Contact[];
	};
	user?: any;
	session?: any;
	listItems?: ListItems;
	viewContext?: string;
	viewMode?: string;
	selected?: CRMType;
	questions?: QuestionBase<any>[];
	controls?: {[name: string]: FormControl};
	details?: boolean;
}

export interface ListItems {
	items: any[];
	controls: {[name: string]: FormControl};
	title?: string;
	sublists?: ListItems[];
}
