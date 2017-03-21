import {Quote} from "./quote.model";
import {Setting} from './setting.model';
import {Contact} from './contact.model';
import {Company} from './company.model';
/**
 * Created by aaron on 3/14/2017.
 */
export interface QuoteLine {
    ID: number;
    /**
     * The order each item should be displayed in (smallest to greatest)
     */
    Display: number;

    /**
     * The unit of measure for the item in the quote
     */
    UNIT: string;
    COST: string;
    DESC: string;

    /**
     * If True then the item should be centered in the quote
     */
    IsCentered: Boolean;

    /**
     * The quote that this line is inside
     */
    Quote: Quote;
}

export const QUOTE: Quote = {
    ID : 1,
    Date : null,
    Name : "First Quote",
    Company : null,
    Lines: null
};

export const COMPANY: Company = {
    ID: 1,
    Name: "AJP Northwest",
    Address: "1111 SW Portland",
    City: "Portland",
    Zip: "97034",
    Phone: "555-555-5555",
    Misc: "aswrfghjkjhgfdc",
    Contacts:null,
    Quotes:null
};

export const QUOTELINES: QuoteLine[] = [{
    ID: 1,
    Display: 1,
    UNIT: "Case",
    COST: "$1.76",
    DESC: "sfh",
    IsCentered: false,
    Quote: null
}];

export const CONTACT: Contact = {
    ID: 1,
    Name: "Contact_Test",
    Phone: "503-999-8085",
    Email: "contact@contact.com",
    Position: "CEO",
    Company: void 0,
    Notes:  void 0,
};

export const SETTINGS: Setting = {
    ID: 1,
    Name: "Aaron Campf",
    Gmail: "Example@Gmail.com",
    GmailPassword: "",
    Email: "Company@Gmail.com",
    Address: "1600 Amphitheatre Parkway, Mountan View CA",
    Phone: "503-999-9999",
    CompanyName: "AJP",
    CompanyWebsite: "www.ajp.com",
    CompanyPhone: "503-333-3333",
    CellPhone: "503-555-5555",
    CompanyFax: "503-987-9854"
};