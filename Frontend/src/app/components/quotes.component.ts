import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Note} from '../models/note.model';
import {Company} from '../models/company.model';
import {CompanyService} from '../services/companies.service';
import {Quote} from '../models/quote.model';
import {QuoteService} from '../services/quotes.service';

@Component({
	selector: 'quotes-component',
	template: `
	<div class="row">
		<h4>Quotes</h4>
		<div class="col-xs-4">
			<table class="table table-bordered table-hover">
				<thead>
				<tr>
					<th>Companies</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td (click)="selected(0)">Select All The Things!</td>
				</tr>
				<tr *ngFor="let company of companies">
					<td [class.active]="selectedCompany.ID === company.ID" (click)="selected(company.ID)">{{company.Name}}</td>
				</tr>
				</tbody>
			</table>
		</div>
		<div class="col-xs-8">
			<button type="button" class="btn btn-block" [routerLink]="['/create-quote', selectedCompany.ID]" [disabled]="!selectedCompany.ID" [class.disabled]="!selectedCompany.ID">New Quote</button>
			<table class="table table-bordered table-hover">
				<tr>
					<th>Name</th>
					<th>Phone</th>
					<th>Position</th>
				</tr>
				<tr *ngFor="let quote of quotes" (click)="quoteSelect(quote.ID)" [class.active]="quote.ID === selectedQuote.ID">
					<td>{{quote.Phone}}</td>
					<td>{{quote.Position}}</td>
					<td>
						<i class="glyphicon glyphicon-edit" [routerLink]="['/edit-quote', quote.ID]"></i>
					</td>
					<td>
						<i class="glyphicon glyphicon-remove" (click)="removeQuote(quote.ID)"></i>
					</td>
				</tr>
			</table>
		</div>
	</div>
	<div class="row">
		<h4>Quote Notes</h4>
		<button type="button" class="btn btn-block" [routerLink]="['/create-quote', companyId]" [disabled]="selectedQuote" [class.disabled]="selectedQuote">View Quote</button>
	</div>
	`,
})

export class QuotesComponent implements OnInit, OnChanges {
	public companies: Company[] = [];
	public companyId: number;
	public notes: Note[] = [];
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
				private companyService: CompanyService,
				private route: ActivatedRoute) {}

	public ngOnChanges(changes: SimpleChanges): void {}

	public ngOnInit(): void {
		this.route.queryParams.subscribe(params => {
			this.companyId = +params['id'];
		});
		this.companyService.getCompanies().subscribe(companies => {
			this.companies = companies;
		});
		this.quoteService.getQuotes().subscribe(quotes => {
			this.quotes = quotes;
		});
	}

	public selected(companyId: number, quoteId?: number) {
		if (quoteId){
			for(let quote of this.quotes) {
				if (quote.ID === quoteId) {
					this.selectedQuote = quote;
				}
			}
		} else if (companyId === 0) {
			this.selectedCompany = <Company>{};
			this.quoteService.getQuotes().subscribe(quotes => this.quotes = quotes);
		} else {
			for(let company of this.companies){
				if (company.ID === companyId) {
					this.selectedCompany = company;
					this.quoteService.getCompanyQuotes(this.selectedCompany.ID).subscribe(quotes => {
						this.quotes = quotes;
					})
				}
			}
		}
	}

	public createQuote(companyId: number): void {

	}

	public removeQuote(quoteId: number): void {
		this.quoteService.deleteQuote(quoteId).subscribe(res => {
			this.quoteService.getCompanyQuotes(this.companyId)
				.subscribe(quotes => this.quotes = quotes, err => console.log(err));
		});
	}

	public quoteSelect(quoteId: number): void {
		this.quoteService.getQuote(quoteId).subscribe(quote => {
			this.selectedQuote = quote;
		})
	}
}