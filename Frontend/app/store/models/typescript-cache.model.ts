import {Company} from '../../main/models/company.model';
import {Note} from '../../main/models/note.model';
import {Quote} from '../../main/models/quote.model';
import {Contact} from '../../main/models/contact.model';
import {List} from '../../forms/services/forms.service';

export const RD_CACHE_INITIAL_STATE = {
	companies: [],
	notes: [],
	quotes: [],
	contacts: [],
	user: [],
	companiesList:<List>{},
	notesList:<List>{},
	quotesList:<List>{},
	contactsList:<List>{},
};

export interface RDCache {
	companies:Company[];
	notes: Note[];
	quotes: Quote[];
	contacts: Contact[];
	user?: any;
	companiesList: List;
	notesList: List;
	quotesList: List;
	contactsList: List;
}
