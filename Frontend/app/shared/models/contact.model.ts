/**
 * Created by aaron on 3/14/2017.
 * edited by RD on 4/17/2017
 */
export interface Contact {
	id?: string;
	companyId: string;
	name: string;
	phone: string;
	email: string;
	position: string;
	type: 'contact';
	update_at?: string;
	created_at?: string;

	/**
	 * The company that this contact belongs to
	 */
	// Company?: Company;

	/**
	 * All notesCollection written for this contact
	 */
	// Notes?: Note[];
}