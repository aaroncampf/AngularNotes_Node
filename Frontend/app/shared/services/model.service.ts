import {Injectable} from '@angular/core';
import {newQuote} from '../models/quote.model';
import {newCompany} from '../models/company.model';
import {newContact} from '../models/contact.model';
import {newNote} from '../models/note.model';
import {CRMType} from '../models/crm-models.type';

@Injectable()
export class ModelService {

	public selectedUpdate(crmModel: CRMType): void {

	}
	public newModel(tab): CRMType {
		console.log(tab);
		switch (tab) {
			case'companies':
				return newCompany();
			case'contacts':
				return newContact();
			case'notes':
				return newNote();
			case'quotes':
				return newQuote();
		}
	}
}