/**
 * Created by aaron on 3/14/2017.
 * edited by RD on 4/17/2017
 */
export interface _Contact {
	companyId: string;
	id?: string;
}

export interface Contact extends _Contact {
	name: string;
	phone: string;
	email: string;
	position: string;
	updated_at?: string;
	created_at?: string;
	modelType: 'contact'
}

export function newContact(): Contact {
		return {
			id: null,
			companyId: null,
			name: null,
			phone: null,
			email: null,
			position: null,
			updated_at: null,
			created_at: null,
			modelType: 'contact'
		}

}
