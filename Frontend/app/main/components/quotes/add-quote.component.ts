import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CRMDataService} from '../../services/crm-data.service';
import {CRMStoreService} from '../../services/crm-store.service';
import {Subscription} from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {newQuote, Quote, QuoteLine} from '../../models/quote.model';
import {Observable} from 'rxjs/Observable';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';

@Component({
	selector: 'create-quote-component',
	template: `
	<quote-header [formGroup]="quoteForm">
		<div class="row">
			<single-line-text-input-component class="col-xs-12 quote-name" placeholder="Quote Name" [(model)]="quote.name" [control]="quoteNameControl"></single-line-text-input-component>
			<hr/>
		</div>
	</quote-header>
	<quote-body *ngIf="quoteLines" [formGroup]="quoteLineForm">
		<h5>Quote Lines</h5>
		<ul class="quote-list">
			<hr/>
			<li class="quote-list-line" *ngFor="let quoteLine of quoteLines">
				<span class="cross-icon" (click)="removeLine(i)"><img src="../../../../assets/icons/SVG/cross.svg"/></span>
				<div class="quote-list-line-details">
					<div class="quote-line-unit-cost">
						<single-line-text-input-component label="Unit" class="quote-line-unit" [(model)]="quoteLine.unit"></single-line-text-input-component>
						<single-line-text-input-component label="$" [(model)]="quoteLine.cost"></single-line-text-input-component>
					</div>
					<div class="quote-list-line-title-wrapper">
						<single-line-text-input-component label="Desc." [(model)]="quoteLine.desc"></single-line-text-input-component>
					</div>
				</div>
				<div class="quote-line-options">
					<span class="icon icon-arrow-up" (click)="onUp(i)"></span>
					<span class="icon icon-arrow-down" (click)="onDown(i)"></span>
				</div>
			</li>
			<hr/>
		</ul>
	</quote-body>
	<quote-footer [formGroup]="newQuoteLineForm">
		<div class="row">
			<hr/>
			<div class="quote-line-unit-cost">
				<single-line-text-input-component label="Unit" class="quote-line-unit" [(model)]="newQuoteLine.unit" [control]="unitControl"></single-line-text-input-component>
				<single-line-text-input-component label="Cost" [(model)]="newQuoteLine.cost" [control]="costControl"></single-line-text-input-component>
			</div>
			<single-line-text-input-component label="Desc." [(model)]="newQuoteLine.desc" [control]="descControl"></single-line-text-input-component>
			<button class="btn btn-lg" (click)="addLine()">Add Line</button>
		</div>
	</quote-footer>
	<hr>
	<button class="btn-warning btn-lg pull-right" [routerLink]="['/Home']">Cancel</button>
	<button class="btn-success btn-lg pull-right" (click)="onSave()">Save</button>
	`
})
export class AddQuoteComponent implements OnInit , OnDestroy{
	@Output()
	public action: EventEmitter<any> = new EventEmitter();
	public quote: Quote = <Quote>{};
	private quoteLinesSource: BehaviorSubject<QuoteLine[]> = new BehaviorSubject<QuoteLine[]>([]);
	public quoteLine$: Observable<QuoteLine[]> = this.quoteLinesSource.asObservable();
	public quoteLinesSub: Subscription;
	public quoteLines: QuoteLine[] = [];
	public newQuoteLine: QuoteLine = <QuoteLine>{};
	private stateSub: Subscription;
	public ownerID: string = null;
	public unitControl: FormControl = new FormControl('', []);
	public costControl: FormControl = new FormControl('', []);
	public descControl: FormControl = new FormControl('', []);
	public newQuoteLineForm: FormGroup = new FormGroup({
		unit: this.unitControl,
		cost: this.costControl,
		desc: this.descControl,
	});
	public quoteLineForm: FormGroup = new FormGroup({});
	public quoteNameControl: FormControl = new FormControl('', [Validators.required]);
	public quoteForm: FormGroup = new FormGroup({
		quoteName: this.quoteNameControl
	});

	constructor(
		public toastr: ToastsManager,
		private router: Router,
		private crmData: CRMDataService,
		private crmStore: CRMStoreService
	){}

	public ngOnInit(): void {
		this.stateSub = this.crmStore.crmStore$.subscribe(state => {
			if(state.selectedCompany && state.selectedCompany.id){
				this.ownerID = state.selectedCompany.id;
				this.initializeNewQuote();
			} else {
				this.ownerID = null;
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
		if (lineIndex < this.quoteLines.length - 1){
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
		this.newQuoteLine.weight = this.quoteLinesSource.getValue().length;
		const updatedLine = this.quoteLinesSource.getValue().concat(this.newQuoteLine);
		this.quoteLinesSource.next(updatedLine);
		this.newQuoteLine = <QuoteLine>{};
	}

	private initializeNewQuote(): void {
		this.quote = newQuote();
		this.quoteLinesSource.next([]);
	}

	public onSave(): void {
				this.toastr.success(this.quote.name + ' has been saved!');
				this.action.emit({type: 'QUOTE_SELECTED', payload: Object.assign({},this.quote, {quoteLines: this.quoteLines})});
	// 	this.crmData.newQuote({owner_id: this.ownerID, props:{name: this.quote.name}})
	// 		.then(quote => {
	// 			for(let quoteLine of this.quoteLines){
	// 				this.crmData.newQuoteLine({owner_id: quote.id, props: quoteLine});
	// 			}
	// 			this.toastr.success(this.quote.name + ' has been saved!');
	// 			this.action.emit({type: 'QUOTE_SELECTED', payload: quote});
	// 	})
	}
}