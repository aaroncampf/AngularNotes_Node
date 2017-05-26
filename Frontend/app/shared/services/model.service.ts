import {Injectable} from '@angular/core';
import {newQuote} from '../../main/models/quote.model';
import {newCompany} from '../../main/models/company.model';
import {newContact} from '../../main/models/contact.model';
import {newNote} from '../../main/models/note.model';
import {CRMType} from '../../main/models/crm-models.type';

@Injectable()
export class ModelService {

	public newModel(tab): CRMType {
		let response;
		switch (tab) {
			case'companies':
				response =  newCompany();
				break;
			case'contacts':
				response =  newContact();
				break;
			case'notes':
				response =  newNote();
				break;
			case'quotes':
				response =  newQuote();
				break;
		}
		return response;
	}
}