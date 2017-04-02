/**
 * Created by aaron on 3/17/2017.
 */

/**
 * Created by aaron on 3/14/2017.
 * edited by Rdev1163@outlook.com
 */
//todo - Perhaps Refactor this into a user model?
//todo - Why do we have gmail and gmail password?
export interface Settings {
	id: string;
	name: string;
	email: string;
	address: string;
	companyFax: string;
	companyName: string;
	companyPhone: string;
	companyWeb: string;
	passHash: string;
	phone: string;
	role: string;
	// updated_at: string | Date;
	// created_at: string | Date;
	// deleted_at?: string | Date;
}