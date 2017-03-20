/**
 * Created by aaron on 3/17/2017.
 */


import {Component, Input} from '@angular/core';
import {Company} from "../models/company.model";
import {Quote} from "../models/quote.model";
import {QuoteLine} from "../models/quotelines.model";
import {Setting} from "../models/setting.model";

/**
 * Displays a quote as a beautiful printout
 */
@Component({
    selector: 'quotes_printout-component',
    template: `
    <h1>{{_Settings.CompanyName}}</h1>
    <p>{{_Settings.Address}}</p>
    <p>{{_Settings.CompanyWebsite}}</p>
    
    <table>
          <tr>
            <td>Cell: {{_Settings.CellPhone}}</td>
            <td>Phone: {{_Settings.CompanyPhone}}</td>
            <td>Fax: {{_Settings.CompanyFax}}</td>
          </tr>
    </table>
        
    <p>
        <b>TO:</b> {{_Company.Name}} <br>
        {{_Contact.Name}}<br>
        {{_Company.Address}}
        {{_Company.Phone}}
    </p>
    
        <table>
        <tr>           
            <th>Salesperson</th>
            <th>Email</th>
        </tr>
        <tr>
            <td>{{_Settings.Name}}</td>
            <td>{{_Settings.Email}}</td>
        </tr>
    </table>
    
    
    <table>
        <caption>{{_Quote.Name}}</caption>
        <tr css="background=lightgray">
            <th>Unit</th>
            <th>Description</th>
            <th>Cost</th>
        </tr>
        <tbody>
            <tr *ngFor="let Line of _QuoteLines">        
                <td>{{Line.UNIT}}</td>
                <td>{{Line.DESC}}</td>
                <td>{{Line.UNIT}}</td>
            </tr>
        </tbody>
    </table>
`
})
/**
 * Displays a quote as a motha fuckn beautiful printout
 */
export class Quotes_Printout implements  ModalComponent {
    //TODO: Consider only using [Quote] and not the others
    //TODO: Find out how to order _QuoteLines by Display
    //TODO: Maybe this might help make this less interpolated - http://stackoverflow.com/questions/38996376/generate-pdf-file-from-html-using-angular2-typescript :)

    @Input()
    public _Quote: Quote;
    @Input()
    public _Company: Company;
    @Input()
    public  _QuoteLines: QuoteLine[];
    @Input()
    public _Settings: Setting;



    /**
     * The constructor for the [Component]
     * @param _Quote The quote that will be displayed
     * @param _Company The quote's company
     * @param _QuoteLines The lines in the quote
     * @param _Settings The setting for that user
     */
    ///constructor(public _Quote: Quote, public _Company: Company, public  _QuoteLines: QuoteLine[], _Settings: Setting) {}

}

