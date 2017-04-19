import {Component, OnInit} from '@angular/core';
import {Quote} from './quote.model';
import {DataShareService} from '../common/services/data-share.service';
import {QuoteLine} from './quote.model';
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
					<div class="col-xs-6">id: {{quote.id}}</div>
				</div>
				<div class="row">
					<div class="col-xs-6">Date: {{quote.Date | date: 'MM/dd/yyyy'}}</div>
				</div>
				<input-component label="Name" [model]="quote.Name" (modelChange)="updateQuote($event, 'Name', quote)"></input-component>
			</div>
			<div *ngFor="let line of quoteLines" class="quote-item">
				<div class="row">
					<i class="glyphicon glyphicon-remove pull-right" (click)="removeLine(line.id)"></i>
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
				private dataShareService: DataShareService){}

	public ngOnInit(): void {
	}

	public removeLine(lineId: number): void {

	}

	public addLine(quoteLine: QuoteLine): void {
	}

	public removeQuote(quoteid: number): void {
	}

	public updateQuote(value: string, key: string, quote: Quote){
	}

	public updateQuoteLine(value: string, prop: string, quoteLine: QuoteLine): void {
	}
}