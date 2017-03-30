import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Company} from '../models/company.model';
import {Quote} from '../models/quote.model';
import {QuoteService} from '../services/quotes.service';
import {DataShareService} from '../services/data-share.service';
import {Toast, ToastsManager} from 'ng2-toastr/ng2-toastr';
import {QuoteLine} from '../models/quotelines.model';
import {Router} from '@angular/router';

@Component({
	selector: 'quotes-component',
	template: `
		<h4>{{ selectedCompany.Name || 'All' }} Quotes</h4>
		<div class="col-xs-12">
			<button type="button" class="btn btn-block" [routerLink]="['/create-quote', selectedCompany.ID]" [disabled]="!selectedCompany.ID" [class.disabled]="!selectedCompany.ID">New Quote</button>
			<div *ngFor="let quote of quotes" class="card" (click)="onSelectQuote(quote)">
				<div class="row card-">
					<span class="col-xs-2"><b>QID:</b> {{quote.ID}}</span>
					<span class="col-xs-4"><b>Date:</b> {{quote.Date | date: 'MM/dd/yyyy'}}</span>
					<span class="col-xs-6"><b>Name:</b> {{quote.Name}}</span>
				</div>
				<div class="row">
					<div class="col-xs-12"><hr></div>
					<span class="col-xs-1 text-left">IID</span>
					<span class="col-xs-2 text-left">Unit</span>
					<span class="col-xs-2 text-left">Cost</span>
					<span class="col-xs-6 text-left">Desc.</span>
					<span class="col-xs-1 text-left"></span>
				</div>
				<div *ngIf="selectedCompany.ID">
				<div class="row" *ngFor="let line of quote.Lines">
					<span class="col-xs-1">{{line.ID}}</span>
					<span class="col-xs-2">{{line.UNIT}}</span>
					<span class="col-xs-2">{{line.COST}}</span>
					<span class="col-xs-6">{{line.DESC}}</span>
					<span class="col-xs-1">
						<i class="glyphicon glyphicon-minus-sign"></i>
					</span>
				</div>
				<div class="row">
					<span class="col-xs-1">#</span>
					<span class="col-xs-2">
						<input-component [(model)]="quoteLine.UNIT" [control]="unitControl"></input-component>
					</span>
					<span class="col-xs-2">
						<input-component [(model)]="quoteLine.COST" [control]="costControl"></input-component>
					</span>
					<span class="col-xs-6">
						<input-component [(model)]="quoteLine.DESC" [control]="descControl"></input-component>
					</span>
					<span class="col-xs-1">
						<i class="glyphicon glyphicon-plus-sign" (click)="addLine(quote, quote.Lines)"></i>
					</span>
				</div>
				<div class="row">
					<button class="btn btn-block" [routerLink]="['/quote-print']">View / Print / Download</button>
				</div>
			</div>
					
				</div>
		</div>
	`,
})

export class QuotesComponent implements OnInit, OnChanges {
	public companies: Company[] = [];
	public selectedQuote: Quote = <Quote>{};
	public selectedCompany: Company = <Company>{};
	public quotes: Quote[] = [];
	public quoteLine: QuoteLine = <QuoteLine>{};
	public quoteLines: QuoteLine[];
	public idControl: FormControl = new FormControl('', []);
	public unitControl: FormControl = new FormControl('', []);
	public costControl: FormControl = new FormControl('', []);
	public descControl: FormControl = new FormControl('', []);
	public lineGroup: FormGroup = new FormGroup({
		unitControl: this.unitControl,
		costControl: this.costControl,
		descControl: this.descControl,
	});

	public nameControl: FormControl = new FormControl('', []);
	public emailControl: FormControl = new FormControl('', []);
	public titleControl: FormControl = new FormControl('', []);
	public positionControl: FormControl = new FormControl('', []);
	public phoneControl: FormControl = new FormControl('', []);
	public quotesGroup: FormGroup = new FormGroup({
		name: this.nameControl,
		email: this.emailControl,
		position: this.positionControl,
		phone: this.phoneControl,
		title: this.titleControl
	});
	constructor(private quoteService: QuoteService,
				private dataShareService: DataShareService,
				private router: Router,
				public toastr: ToastsManager) {}

	public ngOnChanges(changes: SimpleChanges): void {
		console.log('quotes change hit');
	}

	public ngOnInit(): void {
		this.dataShareService.companySelected$.subscribe(company=> {
			this.selectedCompany = company;
			if(this.selectedCompany.ID){
				this.quoteService.getCompanyQuotes(this.selectedCompany.ID).subscribe(quotes => this.quotes = quotes);
			} else {
				this.quoteService.getQuotes().subscribe(quotes => this.quotes = quotes);
			}
		});
	}

	public addLine(quote: Quote): void {
		this.quoteService.updateQuote(quote).subscribe(quoteLine => {
			console.log('res', quoteLine);
			this.quoteService.getQuotes().subscribe(quotes => this.quotes);
		})
	}

	public onSelectQuote(quote: Quote): void {
		this.dataShareService.sendQuote(quote);
		this.router.navigate(['/quote-details'])
	}
	public onSelect(companyId: number, quoteId?: number) {

		this.quoteService
		// if (quoteId){
		// 	for(let quote of this.quotes) {
		// 		if (quote.ID === quoteId) {
		// 			this.selectedQuote = quote;
		// 			console.log('onSelect', this.selectedQuote)
		// 		}
		// 	}
		// } else if (companyId === 0) {
		// 	this.selectedCompany = <Company>{};
		// 	this.quoteService.getQuotes().subscribe(quotes => this.quotes = quotes);
		// } else {
		// 	for(let company of this.companies){
		// 		if (company.ID === companyId) {
		// 			this.selectedCompany = company;
		// 			this.quoteService.getCompanyQuotes(this.selectedCompany.ID).subscribe(quotes => {
		// 				this.quotes = quotes;
		// 			})
		// 		}
		// 	}
		// }
	}

	public removeQuote(quoteId: number): void {
		this.quoteService.deleteQuote(quoteId).subscribe(res => {
			console.log('delete quote', res);
			this.quoteService.getCompanyQuotes(this.selectedCompany.ID)
				.subscribe(quotes => this.quotes = quotes, err => console.log(err));
		});
	}

	public quoteSelect(quoteId: number): void {
		this.quoteService.getQuote(quoteId).subscribe(quote => {
			this.selectedQuote = quote;
		})
	}
}