import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {newQuote, Quote} from '../models/quote.model';
import {QuoteService} from '../services/quotes.service';
import {CompanyService} from '../services/companies.service';

@Component({
	selector: 'create-quote-component',
	template: `
		<div class="container">
			<div class="navbar navbar-fixed-top">
				<button type="reset" class="btn-danger pull-left" [routerLink]="['/quotes/main']">Cancel</button>
			</div>
			<h4>Start A Quote for {{company}}</h4>
			<form [formGroup]="quoteGroup" (ngSubmit)="saveQuote(quote)">
				<input-component label="Name" [(model)]="quote.Name" [control]="nameControl"></input-component>
				<button type="submit" class="btn btn-large pull-right">Save</button>
			</form>
		</div>
	`,

})

export class CreateQuoteComponent implements OnInit{
	public animateState: string = 'in';
	public companyId: string;
	public company: string;
	public quote: Quote = <Quote>{};
	public nameControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
	public quoteGroup: FormGroup = new FormGroup({
		nameControl: this.nameControl,
	});

	constructor(private quoteService: QuoteService, private companyService: CompanyService, private router: Router, private route: ActivatedRoute){}

	public saveQuote(quote: Quote): void {
	 	quote = newQuote(quote);
		this.quoteService.saveNewQuote(this.quote, +this.companyId).subscribe(response => {
			this.router.navigate(['/quotes', +this.companyId])
		})
	}

	public ngOnInit() {
		this.route.params.subscribe(params => {
			this.companyId = params['id'];
			this.companyService.getCompany(+this.companyId).subscribe(company => {
				this.company = company.Name;
			})
		})
	}
}