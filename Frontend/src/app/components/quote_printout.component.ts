/**
 * Created by aaron on 3/17/2017.
 */


import {Component} from '@angular/core';
import {Company} from "../models/company.model";
import {Quote} from "../models/quote.model";
import {QuoteLine} from "../models/quotelines.model";

/**
 * Displays a quote as a beautiful printout
 */
@Component({
    selector: 'quotes_printout-component',
    template: `
    <h1>{{_Company.Name}}</h1>
    
	<div class="row">
		<div class="col-xs-12">
			Created:
		</div>	
		<div class="col-xs-12">
			Title: 
		</div>
	</div>
	<div class="row">
		<div class="col-xs-4">
			Something
		</div>
		<div class="col-xs-8">
			Something else
		</div>
	</div>
	<div class="row">
		<input-component class="col-xs-10" label="Description"></input-component>
		<input-component class="col-xs-10" label="Unit"></input-component>
		<input-component class="col-xs-10" label="Cost"></input-component>
		<button class="col-xs-1">-</button>
		<button class="col-xs-1">+</button>
	</div>
`
})
/**
 * Displays a quote as a beautiful printout
 */
export class QuotesComponent {
    //TODO: Consider only using [Quote] and not the others
    /**
     * The constructor for the [Component]
     * @param _Quote The quote that will be displayed
     * @param _Company The quote's company
     * @param _QuoteLines The lines in the quote
     */
    constructor(public _Quote: Quote, public _Company: Company, public  _QuoteLines: QuoteLine[]) { }

}

