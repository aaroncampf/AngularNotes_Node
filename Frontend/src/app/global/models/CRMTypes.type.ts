import {Quote} from '../../quotes/quote.model';
import {Note} from '../../notes/note.model';
import {Contact} from '../../contacts/contact.model';
import {Company} from '../../companies/company.model';

export type CRMType = Company | Contact | Note | Quote;
