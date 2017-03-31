import {Component, OnInit} from '@angular/core';
import {QuoteService} from '../services/quotes.service';
import {Quote} from '../models/quote.model';
import {DataShareService} from '../services/data-share.service';
import {QuoteLine} from '../models/quotelines.model';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';
@Component({
	selector: 'quote-details-component',
	template: `
	<div class="row">
		<div class="card">
			<div class="row">
				<button type="button" class="btn pull-left" [routerLink]="['/quotes']">Back</button>
			</div>
			<div class="quote-header">
				<div class="row">
					<button type="button" class="btn-danger pull-right" (click)="removeQuote(quote.ID)">Delete</button>
					<div class="col-xs-6">ID: {{quote.ID}}</div>
				</div>
				<div class="row">
					<div class="col-xs-6">Date: {{quote.Date | date: 'MM/dd/yyyy'}}</div>
				</div>
				<input-component label="Name" [model]="quote.Name" (modelChange)="updateQuote($event, 'Name', quote)"></input-component>
			</div>
			<div *ngFor="let line of quoteLines" class="quote-item">
				<div class="row">
					<i class="glyphicon glyphicon-remove pull-right" (click)="removeLine(line.ID)"></i>
				</div>
				<div class="row">
					<input-component class="col-xs-4" label="Unit" [model]="line.UNIT" (modelChange)="updateQuoteLine($event, 'UNIT', line)"></input-component>
					<input-component class="col-xs-4" label="Cost" [model]="line.COST" (modelChange)="updateQuoteLine($event,'COST', line)"></input-component>
					<input-component class="col-xs-4" label="Desc." [model]="line.DESC" (modelChange)="updateQuoteLine($event, 'DESC', line)"></input-component>
				</div>
			</div>
			<div class="quote-item-add">
				<input-component class="col-xs-12" [(model)]="newQuoteLine.UNIT" label="Unit"></input-component>	
				<input-component class="col-xs-12" [(model)]="newQuoteLine.COST" label="Cost"></input-component>	
				<input-component class="col-xs-12" [(model)]="newQuoteLine.DESC" label="Desc."></input-component>
				<button class="btn btn-block" (click)="addLine(newQuoteLine)">ADD LINE</button>
			</div>
		</div>
	</div>
	`
})

export class QuoteDetailsComponent implements OnInit {
	public quote: Quote = <Quote>{};
	public newQuoteLine: QuoteLine = <QuoteLine>{};
	public quoteLines: QuoteLine[] = [];
	constructor(public toastr: ToastsManager,
				private router: Router,
				private quoteService: QuoteService,
				private dataShareService: DataShareService){}

	public ngOnInit(): void {
		this.dataShareService.quoteSelected$
			.subscribe(quote => {
				console.log('quote shared', quote);
				this.quote = quote;
		});
		this.quoteService.getQuoteLines(this.quote.ID)
			.subscribe(quoteLines => {
				console.log('quoteLines', quoteLines);
				this.quoteLines = quoteLines
		});
	}

	public removeLine(lineId: number): void {
		this.quoteService.deleteQuoteLine(lineId)
			.subscribe(() => {
				this.toastr.warning('Quote line Removed');
				this.quoteService.getQuoteLines(this.quote.ID)
					.subscribe(quoteLines => this.quoteLines = quoteLines);
		});

	}

	public addLine(quoteLine: QuoteLine): void {
		this.quoteService.createQuoteLine(quoteLine, this.quote)
			.subscribe(() => {
				this.newQuoteLine = <QuoteLine>{};
				this.quoteService.getQuoteLines(this.quote.ID)
					.subscribe(quoteLines => this.quoteLines = quoteLines);
		});
	}

	public removeQuote(quoteID: number): void {
		this.quoteService.deleteQuote(quoteID)
			.subscribe(() => {
				this.toastr.warning('Quote Deleted');
				this.router.navigate(['/quotes'])
		});
	}

	public updateQuote(value: string, key: string, quote: Quote){
		quote[key] = value;
		this.quoteService.updateQuote(quote)
			.subscribe(res => {
				console.log('update quote', res);
		});
	}

	public updateQuoteLine(value: string, prop: string, quoteLine: QuoteLine): void {
		quoteLine[prop] = value;
		this.quoteService.updateQuoteLine(quoteLine)
			.subscribe(() => {});
	}
}