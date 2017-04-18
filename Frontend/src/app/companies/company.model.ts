export interface _Company {
	id?: number;
	name: string;
	address1: string;
	address2: string;
	city: string;
	zip: string;
	phone: string;
	email: string;
	web: string;
	misc: string;
	fax: string;
}

export interface Company extends _Company {
	updated_at: string;
	create_at: string;
}

export function newCompany(response): Company {
	let COMPANY: Company = <Company>response;
	return COMPANY;
}