import {QuoteLine} from "./quotelines.model";
import {Company} from "./company.model";
/**
 * Created by aaron on 3/14/2017.
 */
export interface Quote {
    ID: number;

    /**
     * The date the quote was created
     */
    Date: string;

    /**
     * The display name of the quotes
     */
    Name: string;

    /**
     * The company this write was written for
     */
    Company: Company;

    /**
     * The individual lines of the quote document
     */
    Lines: QuoteLine[];
}

export function newQuote(quote: Quote): Quote {
    let date = new Date().toISOString();
    quote.Date = date;
    return quote;
}