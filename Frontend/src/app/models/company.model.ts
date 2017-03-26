import {Contact} from "./contact.model";
import {Quote} from "./quote.model";

export interface Company {
	ID: number;
	Name: string;
	Address: string;
	City: string;
	Zip: string;
	Phone: string;
	Misc: string;

	/**
	 * The contacts inside of the company
	 */
	Contacts?: Contact[];

	/**
	 * The quotes written for this company
	 */
	Quotes?: Quote[];
}