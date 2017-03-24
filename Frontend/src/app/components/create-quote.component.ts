import {animate, Component, OnInit, state, style, transition, trigger} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Quote} from '../models/quote.model';
import {QuoteService} from '../services/quotes.service';
import {CompanyService} from '../services/companies.service';
import {slideTransitions} from '../animations/transitions.animation';

@Component({
	selector: 'create-quote-component',
	animations: [slideTransitions()],
	host: {'[@contentState]': 'animateState'},
	template: `
		<div class="container">
			<div class="navbar navbar-fixed-top">
				<button type="reset" class="btn-danger pull-left" (click)="animateNavigation('/quotes/all')">Cancel</button>
			</div>
			<h4>Add A Quote for {{company}}</h4>
			<form [formGroup]="quoteGroup" (ngSubmit)="saveQuote()">
				<input-component label="Name" [(model)]="quote.Name" [control]="nameControl"></input-component>
				<input-component label="Phone" [(model)]="quote.Phone" [control]="phoneControl"></input-component>
				<input-component label="Email" [(model)]="quote.Email" [control]="emailControl"></input-component>
				<input-component label="Position" [(model)]="quote.Position" [control]="positionControl"></input-component>
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
	public positionControl: FormControl = new FormControl('', []);
	public emailControl: FormControl = new FormControl('', []);
	public zipControl: FormControl = new FormControl('', []);
	public phoneControl: FormControl = new FormControl('', []);
	public miscControl: FormControl = new FormControl('', []);
	public quoteGroup: FormGroup = new FormGroup({
		nameControl: this.nameControl,
		emailControl: this.emailControl,
		miscControl: this.miscControl,
		positionControl: this.positionControl,
		phoneControl: this.phoneControl,
	});

	constructor(private quoteService: QuoteService, private companyService: CompanyService, private router: Router, private route: ActivatedRoute){}

	public saveQuote(): void {
		this.quoteService.saveNewQuote(this.quote).subscribe(response => {
			this.animateNavigation('/companies/' + this.companyId);
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

	public animateNavigation(path: string): void {
		this.animateState = 'out';
		setTimeout(() => {
			this.router.navigate([path]);
		}, 500)
	}
}