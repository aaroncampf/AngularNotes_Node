/**
 * Created by aaron on 3/14/2017.
 * edited by Rd on 4/17/2017
 */

export interface QuoteLine {
	id?: string;
	quoteId: string;
	weight?: number;
	isCentered?: Boolean;
	unit: string;
	cost: string;
	desc: string;
	modelType: 'quoteLine';
}

export interface Quote {
	id?: string;
	companyId: string;
	name: string;
	quoteLines: QuoteLine[];
	updated_at?: string;
	created_at?: string;
	modelType: 'quote';
}

export function newQuote(): Quote {
	return {
		id: null,
		companyId: null,
		name: null,
		quoteLines: [],
		modelType: 'quote'
	}

}