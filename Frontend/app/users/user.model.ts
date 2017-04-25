
import {CRMType} from '../global/models/CRMTypes.type';

export interface TWT extends User{
	role: 'admin' | 'general' | 'blocked' | 'removed';
	currentSelect : {
		currentParent?: CRMType;
		currentSiblings?: {
			[siblingId: string]: CRMType[]
		};
		current: CRMType;
	};
}

export interface User {
	id: string;
	firstName: string;
	lastName?: string;
	email: string;
	addressOne?: string;
	addressTwo?: string;
	phone?: string;
	businessWeb?: string;
	businessName?: string;
	businessPhone?: string;
	businessFax?: string;
}
