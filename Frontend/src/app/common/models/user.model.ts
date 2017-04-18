export interface User {
	id: string;
	firstName: string;
	lastName: string;
	password: string;
	userName?: string;
	role?: string;
	email?: string;
	phone?: string;
	address?: string;
	credential?: string;
	jwt?: any;
}

