
export interface StateStore {
	currentSelect : {
		[name: string]: {};
		childrenRelations: {};
		parentRelations: {};
	}
}

export interface User {
	id: string;
	name: string;
	email: string;
	address: string;
	phone: string;
	website: string;
	businessName: string;
	businessEmail: string;
	businessPhone: string;
	businessFax: string;
	state: StateStore;

	// updated_at: string | Date;
	// created_at: string | Date;
	// deleted_at?: string | Date;

}