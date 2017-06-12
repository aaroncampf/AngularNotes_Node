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
				<single-line-text-input-component *ngIf="!!quote.name" class="col-xs-12 text-center" [(model)]="quote.name"></single-line-text-input-component>
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
	public quoteSource: BehaviorSubject<Quote> = new BehaviorSubject<Quote>(<Quote>{});
	public quote$: Observable<Quote> = this.quoteSource.asObservable();
	public quote: Quote;
	public quoteSub: Subscription;
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
		this.quoteSub = this.quote$.subscribe(quote => {
			this.quote = quote;
		});
		this.stateSub = this.crmStore.crmStore$.subscribe(state => {
			if(state.selectedQuote && state.selectedQuote.id){
				console.log(state.selectedQuote.id);
				this.crmData.getQuote({id: state.selectedQuote.id})
					.then((quote: Quote) => {
						this.quoteSource.next(quote);
						this.quoteLinesSource.next(quote.quoteLines.sort((a, b) => {
							if ( a.weight > b.weight ) {
								return 1;
							}
							if (a.weight < b.weight) {
								return -1;
							}
						})
						);
					})
			}
		});
		this.quoteLinesSub = this.quoteLine$.subscribe(newLines => {
			this.quoteLines = newLines.sort((a, b) => {
				if ( a.weight > b.weight ) {
					return 1;
				}
				if (a.weight < b.weight) {
					return -1;
				}
			});
		});
	}

	public ngOnDestroy(): void {
		this.stateSub.unsubscribe();
		this.quoteSub.unsubscribe();
	}

	public onDown(lineIndex): void {
		let lines = this.quoteLines;
		if (lines[lineIndex].weight < lines.length - 1){
			lines[lineIndex].weight++;
			lines[lineIndex + 1].weight--;
			this.quoteLinesSource.next(lines);
		}

	}

	public onUp(lineIndex): void {
		let lines = this.quoteLines;
		if (lines[lineIndex].weight > 0){
			lines[lineIndex].weight--;
			lines[lineIndex - 1].weight++;
			this.quoteLinesSource.next(lines);
		}
	}

	public removeLine(lineIndex): void {
		const lines = this.quoteLines;
		if (lineIndex > this.quoteLines.length - 1){
			for (let i = lineIndex + 1, k = this.quoteLines.length; i < k; i++) {
				lines[i].weight--;
			}
		}
		this.crmData.deleteQuoteLine({id: lines[lineIndex].id})
			.then(() => {
				_.pullAt(lines, [lineIndex]);
				this.quoteLinesSource.next(lines);
		})
	}

	public addLine(): void {
		this.crmData.newQuoteLine({owner_id: this.quoteSource.value.id, props: this.newQuoteLine})
			.then(() => {
				const updatedLine = this.quoteLinesSource.value.concat(this.newQuoteLine);
				this.quoteLinesSource.next(updatedLine);
				this.newQuoteLine = <QuoteLine>{};
		})
	}

	public onSave(): void {
		this.crmData.setQuote({id: this.quoteSource.value.id, props: this.quoteSource.value})
			.then(quote => {
				for(let quoteLine of this.quoteLinesSource.value){
					this.crmData.setQuoteLine({
						id: quoteLine.id,
						owner_id: quote.id,
						props: quoteLine
					})
				}
				this.toastr.success(this.quoteSource.value.name + ' has been saved!');
				this.router.navigate(['/Quotes']);
			})
	}

	public onRemove(): void {
		this.crmData.deleteQuote({id: this.quoteSource.value.id})
			.then(res => {
				console.log(res);
				this.crmStore.crmStoreDispatcher({type: 'QUOTE_SELECTED', payload: {quote: {}}});
				this.toastr.warning(this.quoteSource.value.name + ' has been removed!');
				this.router.navigate(['/Quotes']);
			})
	}

	public onCheckRemove(): void {
		this.checkRemove = !this.checkRemove;
	}
}