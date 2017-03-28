import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Note} from '../models/note.model';
import {Company} from '../models/company.model';
import {CompanyService} from '../services/companies.service';
import {Quote} from '../models/quote.model';
import {QuoteService} from '../services/quotes.service';
import {DataShareService} from '../services/data-share.service';

@Component({
	selector: 'quotes-component',
	template: `
		<h4>Quotes</h4>
		<div class="col-xs-8">
			<button type="button" class="btn btn-block" [routerLink]="['/create-quote', selectedCompany.ID]" [disabled]="!selectedCompany.ID" [class.disabled]="!selectedCompany.ID">New Quote</button>
			<table *ngFor="let quote of quotes" class="table table-bordered table-hover">
				<tr>
					<th>Date</th>
					<th>Name</th>
					<th>
						<i class="glyphicon glyphicon-edit" [routerLink]="['/edit-quote', quote.ID]"></i>
					</th>
					<th>
						<i class="glyphicon glyphicon-remove-circle" (click)="removeQuote(quote.ID)"></i>
					</th>
				</tr>
					<tr (click)="onSelect(this.selectedCompany.ID, quote.ID)" [class.active]="quote.ID === selectedQuote.ID">
						<td>{{quote.Date | date: 'MM/dd/yyyy'}}</td>
						<td>{{quote.Name}}</td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<th>ID</th>
						<th>Unit</th>
						<th>Cost</th>
						<th>Desc.</th>
						<th></th>
					</tr>
					<tr *ngFor="let line of quote.Lines">
						<td>{{line.ID}}</td>
						<td>{{line.UNIT}}</td>
						<td>{{line.COST}}</td>
						<td>{{line.DESC}}</td>
						<td></td>
						<td>
							<i class="glyphicon glyphicon-minus-sign"></i>
						</td>
					</tr>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td>
							<i class="glyphicon glyphicon-plus-sign"></i>
						</td>
					</tr>
			</table>
		</div>
	`,
})

export class QuotesComponent implements OnInit, OnChanges {
	public companies: Company[] = [];
	public selectedQuote: Quote = <Quote>{};
	public selectedCompany: Company = <Company>{};
	public quotes: Quote[] = [];
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
				private dataShareService: DataShareService) {}

	public ngOnChanges(changes: SimpleChanges): void {}

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

	public onSelect(companyId: number, quoteId?: number) {

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