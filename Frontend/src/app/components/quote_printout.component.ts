/**
 * Created by aaron on 3/17/2017.
 */


import {Component, OnInit} from '@angular/core';
import {Company} from "../models/company.model";
import {Quote} from "../models/quote.model";
import {QuoteLine} from "../models/quotelines.model";
import {Settings} from "../models/setting.model";
import {Contact} from '../models/contact.model';
import {COMPANY, CONTACT, QUOTE, QUOTELINES, SETTINGS} from '../models/quote-line.fixture';
import {DataShareService} from '../services/data-share.service';
import {QuoteService} from '../services/quotes.service';

/**
 * Displays a quote as a beautiful printout
 */
@Component({
	selector: 'quotes-printout-component',
	template: `
    <h1 style="text-align: center;">{{_Settings.CompanyName}}</h1>
    <p style="text-align: center;">{{_Settings.Address}}</p>
    <p style="text-align: center;">{{_Settings.CompanyWebsite}}</p>
    <table>
          <tr>
            <td style="text-align: center;">Cell: {{_Settings.CellPhone}}</td>
            <td style="text-align: center;">Phone: {{_Settings.CompanyPhone}}</td>
            <td style="text-align: center;">Fax: {{_Settings.CompanyFax}}</td>
          </tr>
    </table>
    <table>
        <tr>
            <td>
                <p>
                    <b>TO:</b> {{_Company.Name}}<br>
                    {{_Contact.Name}}<br>
                    {{_Company.Address}}<br>
                    {{_Company.Phone}}
                </p>
            </td>
            <td>
                <table  style="float:right">
                    <tr>
                        <th style="background-color:lightblue;text-align: center;">Salesperson</th>
                        <th style="background-color:lightblue;text-align: center;">Email</th>
                    </tr>
                    <tr>
                        <td style="text-align: center;">{{_Settings.Name}}</td>
                        <td style="text-align: center;">{{_Settings.Email}}</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>  
    <br>
    <table class="table table-striped">
        <caption style="text-align: center;">{{_Quote.Name}}</caption>
        <tr>
            <th style="background-color: lightblue;text-align: center;">Unit</th>
            <th style="background-color: lightblue;text-align: center;">Description</th>
            <th style="background-color: lightblue;text-align: center;">Cost</th>
        </tr>
        <tbody>
            <tr *ngFor="let Line of _QuoteLines">        
                <td style="text-align: center;">{{Line.UNIT}}</td>
                <td style="text-align: center;">{{Line.DESC}}</td>
                <td style="text-align: center;">{{Line.COST}}</td>
            </tr>
        </tbody>
    </table>
    <table>
        <tr>
            <td>Supplies on Request</td>
            <td  style="text-align: right;">All prices subject to change without notice</td>
        </tr>
    </table>
`
})
/**
 * Displays a quote as a mutha $!@#!@# beautiful printout
 */
export class Quotes_Printout implements OnInit {
	//TODO: Consider only using [Quote] and not the others
	//TODO: Find out how to order _QuoteLines by Display

	public _Quote: Quote = QUOTE;
	public _Company: Company = COMPANY;
	public _QuoteLines: QuoteLine[] = QUOTELINES;
	public _Settings: Settings = SETTINGS;
	public _Contact: Contact = CONTACT;
    constructor(private dataShareService: DataShareService,
                private quoteService: QuoteService){}

    public ngOnInit(): void {
        this.dataShareService.companySelected$
            .subscribe(company => this._Company = company);
        this.dataShareService.quoteSelected$
            .subscribe(quote => {
            this._Quote = quote;
            this.quoteService.getQuoteLines(quote.ID)
                .subscribe(quoteLines => this._QuoteLines = quoteLines);
        });
    }
}
