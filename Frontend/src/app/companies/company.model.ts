import {Contact} from "../contacts/contact.model";
import {Quote} from "../quotes/quote.model";

export interface Company {
	ID: number;
	Name: string;
	Address: string;
	City: string;
	Zip: string;
	Phone: string;
	Misc: string;
	Fax: string;
	Web: string;

	/**
	 * The contacts inside of the company
	 */
	Contacts?: Contact[];

	/**
	 * The quotes written for this company
	 */
	Quotes?: Quote[];
}