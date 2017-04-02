import {Quote} from './quote.model';
import {Company} from './company.model';
import {Contact} from './contact.model';
import {QuoteLine} from './quotelines.model';
export const QUOTELINES: QuoteLine[] = [
	{
		ID: 1,
		Display: 1,
		UNIT: "Case",
		COST: "$1.76",
		DESC: "sfh",
		IsCentered: false,
		// Quote: null
	},
	{
		ID: 1,
		Display: 2,
		UNIT: "Case",
		COST: "$1.76",
		DESC: "sfh",
		IsCentered: false,
		// Quote: null
	},
	{
		ID: 1,
		Display: 3,
		UNIT: "Case",
		COST: "$1.76",
		DESC: "sfh",
		IsCentered: false,
		// Quote: null
	}
];

export const QUOTE: Quote = {
    ID : 1,
    Date : null,
    Name : "First Quote",
    Company : null,
    Lines: [{
		ID: 1,
		Display: 1,
		UNIT: "Case",
		COST: "$1.76",
		DESC: "sfh",
		IsCentered: false,
		// Quote: null
	},
	{
		ID: 1,
		Display: 2,
		UNIT: "Case",
		COST: "$1.76",
		DESC: "sfh",
		IsCentered: false,
		// Quote: null
	},
	{
		ID: 1,
		Display: 3,
		UNIT: "Case",
		COST: "$1.76",
		DESC: "sfh",
		IsCentered: false,
		// Quote: null
	}
]};

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

export const CONTACT: Contact = {
    ID: 1,
    Name: "Contact_Test",
    Phone: "503-999-8085",
    Email: "contact@contact.com",
    Position: "CEO",
    Company: void 0,
    Notes:  void 0,
};

// export const SETTINGS: Settings = {
//     ID: 'ff615834-1533-48f4-b38f-316108606e87',
//     Name: "Aaron Campf",
//     Gmail: "Example@Gmail.com",
//     GmailPassword: "",
//     Email: "Company@Gmail.com",
//     Address: "1600 Amphitheatre Parkway, Mountan View CA",
//     Phone: "503-999-9999",
//     CompanyName: "AJP",
//     CompanyWebsite: "www.ajp.com",
//     CompanyPhone: "503-333-3333",
//     CellPhone: "503-555-5555",
//     CompanyFax: "503-987-9854"
// };