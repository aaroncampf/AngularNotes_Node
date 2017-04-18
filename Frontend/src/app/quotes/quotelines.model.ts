import {Quote} from "./quote.model";
/**
 * Created by aaron on 3/14/2017.
 */
export interface QuoteLine {
    ID: number;
    /**
     * The order each item should be displayed in (smallest to greatest)
     */
    Display?: number;
    /**
     * The unit of measure for the item in the quote
     */
    UNIT: string;
    COST: string;
    DESC: string;
    /**
     * If True then the item should be centered in the quote
     */
    IsCentered?: Boolean;

    /**
     * The quote that this line is inside
     */
    // Quote: Quote;
}
