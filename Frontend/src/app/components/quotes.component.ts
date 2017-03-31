import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Company} from '../models/company.model';
import {newQuote, Quote} from '../models/quote.model';
import {QuoteService} from '../services/quotes.service';
import {DataShareService} from '../services/data-share.service';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {QuoteLine} from '../models/quotelines.model';
import {Router} from '@angular/router';

@Component({
	selector: 'quotes-component',
	template: `
	<h4>{{ selectedCompany.Name || 'All' }} Quotes</h4>
		<button type="button" class="btn btn-block" (click)="addNewQuote()" [disabled]="!selectedCompany.ID" [class.disabled]="!selectedCompany.ID">New Quote</button>
		<div *ngFor="let quote of quotes" (click)="onSelectQuote(quote)">
			<div class="row">
				<span class="col-xs-2"><b>QID:</b> {{quote.ID}}</span>
				<span class="col-xs-4"><b>Date:</b> {{quote.Date | date: 'MM/dd/yyyy'}}</span>
				<span class="col-xs-6"><b>Name:</b> {{quote.Name}}</span>
				<quote-list-component [quoteID]="quote.ID"></quote-list-component>
				<i class="glyphicon glyphicon-print pull-right" (click)="navigateToPrint(quote)"></i>
			</div>
		</div>
	`,
})

export class QuotesComponent implements OnInit {
	public newQuote: Quote = <Quote>newQuote(<Quote>{});
	public companies: Company[] = [];
	public selectedCompany: Company = <Company>{};
	public quotes: Quote[] = [];
	public quoteLines: QuoteLine[];
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

	public ngOnInit(): void {
		this.dataShareService.isNavVisible(true);
		this.dataShareService.companySelected$
			.subscribe(company => {
				this.selectedCompany = company;
				if(this.selectedCompany.ID){
					this.quoteService.getCompanyQuotes(this.selectedCompany.ID)
						.subscribe(quotes => this.quotes = quotes);
				} else {
					this.quoteService.getQuotes()
						.subscribe(quotes => this.quotes = quotes);
				}
		});
	}

	public addLine(quote: Quote): void {
		this.quoteService.updateQuote(quote)
			.subscribe(() => {
				this.quoteService.getQuotes()
					.subscribe(quotes => this.quotes);
		});
	}

	public onSelectQuote(quote: Quote): void {
		this.dataShareService.sendQuote(quote);
		this.router.navigate(['/quote-details']);
	}

	public addNewQuote(): void {
		this.quoteService.createQuote(this.newQuote, this.selectedCompany.ID)
			.subscribe(response => {
				this.dataShareService.sendQuote(response);
				this.router.navigate(['/quote-details']);
		})
	}

	public navigateToPrint(quote: Quote): void {
		if (!!this.selectedCompany) {
			this.dataShareService.sendQuote(quote);
			this.dataShareService.isNavVisible(false);
			this.router.navigate(['/quote-print'])
		} else {
			this.toastr.warning('Please select a company.')
		}
	}
}