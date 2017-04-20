
export interface StateStore {
	currentSelect : {
		[name: string]: {};
		childrenRelations: {};
		parentRelations: {};
	}
}

export interface User {
	id: string;
	firstName: string;
	lastName?: string;
	email: string;
	addressOne?: string;
	addressTwo?: string;
	phone?: string;
	website?: string;
	businessName?: string;
	businessEmail?: string;
	businessPhone?: string;
	businessFax?: string;
	role: string;
	state?: StateStore;
}