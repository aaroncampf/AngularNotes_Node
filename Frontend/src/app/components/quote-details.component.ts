import {Component, OnInit} from '@angular/core';
import {QuoteService} from '../services/quotes.service';
import {Quote} from '../models/quote.model';
import {DataShareService} from '../services/data-share.service';
import {QuoteLine} from '../models/quotelines.model';
@Component({
	selector: 'quote-component',
	template: `
	<div class="card">
		<div class="row">
			
			<button type="button" class="btn btn-large pull-left">Back</button>
			<div class="row">
				<div class="col-xs-12 pull-right">ID: {{quote.ID}}</div>
			</div>
			<div class="row">
				<div class="col-xs-12 pull-right">Date: {{quote.Date | date: 'MM/dd/yyyy'}}</div>
			</div>
		</div>
		<input-component label="Name" [(model)]="quote.Name"></input-component>
		<div *ngFor="let line of quote.Lines">
			<input-component class="col-xs-6" label="Cost" [(model)]="line.COST"></input-component>
			<input-component class="col-xs-6" label="Unit" [(model)]="line.UNIT"></input-component>
			<input-component class="col-xs-12" label="Desc." [(model)]="line.DESC"></input-component>
		</div>
		<hr>
			<input-component class="col-xs-6" [model]="newQuoteLine.UNIT" label="Unit"></input-component>	
			<input-component class="col-xs-6" [model]="newQuoteLine.COST" label="Cost"></input-component>	
			<input-component class="col-xs-12" [model]="newQuoteLine.DESC" label="Desc."></input-component>
			<button class="btn btn-block" (click)="addLine(newQuoteLine)">ADD LINE</button>
	</div>
	`
})

export class QuoteDetailsComponent implements OnInit {
	public quote: Quote = <Quote>{};
	public newQuoteLine: QuoteLine = <QuoteLine>{}
	constructor(private quoteService: QuoteService, private dataShareService: DataShareService){}

	public ngOnInit(): void {
		this.dataShareService.quoteSelected$.subscribe(quote => this.quote = quote);
	}

	public addLine(quoteLine: QuoteLine): void {
		this.quote.Lines.push(quoteLine);
		this.quoteService.updateQuote(this.quote).subscribe(response => {
			console.log(response);
			this.quoteService.getQuote(this.quote.ID).subscribe(quote => this.quote = quote);
		});

	}
}