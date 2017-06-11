import {Component, OnDestroy, OnInit} from '@angular/core';
import {CRMDataService} from '../../services/crm-data.service';
import {CRMStoreService} from '../../services/crm-store.service';
import {Subscription} from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {newQuote, Quote, QuoteLine} from '../../models/quote.model';
import {Observable} from 'rxjs/Observable';
import {FormControl, FormGroup} from '@angular/forms';
import * as _ from 'lodash';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';

@Component({
	selector: 'quote-details-component',
	template: `
	<h4>Quote Details</h4>
	<hr>
		<quote-header [formGroup]="quoteForm">
			<div class="row">
				<h5>Quote Title: </h5>
				<single-line-text-input-component class="col-xs-12 text-center" [(model)]="quote.name"></single-line-text-input-component>
				<hr/>
			</div>
		</quote-header>
		<quote-body [formGroup]="quoteLineForm">
			<hr/>
			<h5>Quote Lines</h5>
			<ul class="quote-list">
				<hr/>
				<li class="quote-list-line" *ngFor="let quoteLine of quoteLines; let i = index">
					<span class="icon icon-cross pull-right" (click)="removeLine(i)"></span>
					<div class="quote-list-line-title-wrapper">
						<single-line-text-input-component label="Desc." [(model)]="quoteLine.desc"></single-line-text-input-component>
					</div>
					<div class="quote-list-line-details">
						<quote-line-inputs>
							<single-line-text-input-component label="Units" [(model)]="quoteLine.unit"></single-line-text-input-component>
							<single-line-text-input-component label="$" [(model)]="quoteLine.cost"></single-line-text-input-component>
						</quote-line-inputs>
						<quote-line-options>
							<span class="icon icon-arrow-up" (click)="onUp(i)"></span>
							<span class="icon icon-arrow-down"(click)="onDown(i)"></span>
						</quote-line-options>
					</div>
				</li>
				<hr/>
			</ul>
		</quote-body>
		<quote-footer [formGroup]="newQuoteLineForm">
			<div class="row">
				<hr/>
				<single-line-text-input-component label="Desc." [(model)]="newQuoteLine.desc"></single-line-text-input-component>
				<single-line-text-input-component label="Unit Qty." [(model)]="newQuoteLine.unit"></single-line-text-input-component>
				<single-line-text-input-component label="Cost" [(model)]="newQuoteLine.cost"></single-line-text-input-component>
				<button class="btn btn-lg" (click)="addLine()">Add Line</button>
			</div>
		</quote-footer>
		<hr>
	<div *ngIf="!checkRemove">
		<button type="button" class="btn-success btn-lg pull-left" (click)="onSave()">Save</button>
		<button type="button" class="btn-warning btn-lg pull-left" [routerLink]="['/Quotes']">Cancel</button>
		<button type="button" class="btn-danger pull-right" (click)="onCheckRemove()">REMOVE</button>
	</div>
	<div class="check-remove" *ngIf="!!checkRemove">
		<h4>Are you sure you want to remove {{quote.name}}?</h4>
		<button type="button" class="btn-warning btn-lg pull-right" (click)="onCheckRemove()">Cancel</button>
		<button type="button" class="btn-danger btn-lg pull-right" (click)="onRemove()">REMOVE</button>
	</div>
	`
})
export class QuoteDetailsComponent implements OnInit , OnDestroy{
	public checkRemove: boolean = false;
	private quoteLinesSource: BehaviorSubject<QuoteLine[]> = new BehaviorSubject<QuoteLine[]>([]);
	public quoteLine$: Observable<QuoteLine[]> = this.quoteLinesSource.asObservable();
	public quoteLinesSub: Subscription;
	public quoteLines: QuoteLine[] = [];
	public newQuoteLine: QuoteLine = <QuoteLine>{};
	private stateSub: Subscription;
	public quote: Quote = <Quote>{};
	public unitControl: FormControl = new FormControl('', []);
	public costControl: FormControl = new FormControl('', []);
	public descControl: FormControl = new FormControl('', []);
	public newQuoteLineForm: FormGroup = new FormGroup({
		unit: this.unitControl,
		cost: this.costControl,
		desc: this.descControl,
	});
	public quoteLineForm: FormGroup = new FormGroup({});
	public quoteForm: FormGroup = new FormGroup({});

	constructor(
		public toastr: ToastsManager,
		private router: Router,
		private crmData: CRMDataService,
		private crmStore: CRMStoreService
	){}

	public ngOnInit(): void {
		this.stateSub = this.crmStore.crmStore$.subscribe(state => {
			if(state.selectedQuote && state.selectedQuote.id){
				console.log(state.selectedQuote.id);
				this.crmData.getQuote({id: state.selectedQuote.id})
					.then((quote: Quote) => {
						this.quote = quote;
						console.log(quote);
						this.quoteLinesSource.next(quote.quoteLines);
					})
			}
		});
		this.quoteLinesSub = this.quoteLine$.subscribe(newLines => {
			this.quoteLines = newLines;
		})
	}

	public ngOnDestroy(): void {
		this.stateSub.unsubscribe();
	}

	public onDown(lineIndex): void {
		const lines = this.quoteLinesSource.getValue();
		if(lines.length - 1 > lineIndex){
			const newLines = lines.slice(0, lineIndex).concat(lines[lineIndex + 1]).concat(lines[lineIndex]).concat(lines.slice(lineIndex + 2));
			this.quoteLinesSource.next(newLines)
		}
	}

	public onUp(lineIndex): void {
		const lines = this.quoteLinesSource.getValue();
		if(lineIndex > 0){
			const newLines = lines
				.slice(0, lineIndex - 1).concat(lines[lineIndex]).concat(lines.slice(lineIndex - 1, lineIndex)).concat(lines.slice(lineIndex + 1));
			this.quoteLinesSource.next(newLines);
		}
	}

	public removeLine(lineIndex): void {
		_.pullAt(this.quoteLinesSource.getValue(), [lineIndex]);
	}

	public addLine(): void {
		this.newQuoteLine.weight = this.quoteLinesSource.getValue().length;
		const updatedLine = this.quoteLinesSource.getValue().concat(this.newQuoteLine);
		this.quoteLinesSource.next(updatedLine);
		this.newQuoteLine = <QuoteLine>{};
	}

	public onSave(): void {
	}

	public test(): void {
		console.log(this.quoteLinesSource.getValue());
	}

	public onRemove(): void {
		this.crmData.deleteQuote({id: this.quote.id})
			.then(res => {
				console.log(res);
				this.crmStore.crmStoreDispatcher({type: 'QUOTE_SELECTED', payload: {quote: {}}});
				this.toastr.warning(this.quote.name + ' has been removed!');
				this.router.navigate(['/Quotes']);
			})
	}

	public onCheckRemove(): void {
		this.checkRemove = !this.checkRemove;
	}
}