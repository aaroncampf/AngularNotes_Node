import {Injectable} from '@angular/core';
import {newQuote} from '../../main/models/quote.model';
import {newCompany} from '../../main/models/company.model';
import {newContact} from '../../main/models/contact.model';
import {newNote} from '../../main/models/note.model';
import {CRMType} from '../../main/models/crm-models.type';

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