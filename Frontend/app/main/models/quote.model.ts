/**
 * Created by aaron on 3/14/2017.
 * edited by Rd on 4/17/2017
 */

export interface QuoteLine {
	id?: string;
	quote_id: string;
	weight?: number;
	unit: string;
	cost: string;
	desc: string;
}

export interface Quote  {
	id?: string;
	company_id: string;
	name: string;
	quoteLines: QuoteLine[];
	updated_at?: string;
	created_at?: string;
}

export function newQuote(): Quote {
	return {
		id: null,
		company_id: null,
		name: null,
		quoteLines: [],
	}
}