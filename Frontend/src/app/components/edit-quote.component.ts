import {Component, OnInit} from '@angular/core';
import {Quote} from '../models/quote.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QuoteService} from '../services/quotes.service';
import {CompanyService} from '../services/companies.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
	selector: 'edit-quote-component',
	template: `
	<div class="container">
		<div class="navbar navbar-fixed-top">
			<button type="reset" class="btn-danger pull-left" [routerLink]="['/quotes/', quote.ID]">Cancel</button>
		</div>
		<h4>Update A Quote for {{quote.Company?.Name}}</h4>
		<form [formGroup]="quoteGroup" (ngSubmit)="updateQuote(quote)">
			<input-component label="Name" [(model)]="quote.Name" [control]="nameControl"></input-component>
			<button type="submit" class="btn btn-large pull-right">Apply</button>
		</form>
	</div>
	`,
})

export class EditQuoteComponent implements OnInit {
	public animateState: string = 'in';
	public companyId: string;
	public company: string;
	public quote: Quote = <Quote>{};
	public nameControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
	public quoteGroup: FormGroup = new FormGroup({
		nameControl: this.nameControl,
	});

	constructor(private quoteService: QuoteService, private router: Router, private route: ActivatedRoute) {
	}

	public updateQuote(): void {
		this.quoteService.updateQuote(this.quote, this.quote.ID).subscribe(response => {
			console.log('updating quote',response);
		})
	}

	public ngOnInit() {
		this.route.params.subscribe(params => {
			this.quoteService.getQuote(params['id']).subscribe(quote => {
				this.quote = quote;
			});
		})
	}
}